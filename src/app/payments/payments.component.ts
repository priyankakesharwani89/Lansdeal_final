import {Component, OnInit} from '@angular/core';
import {NodeStringDecoder} from 'string_decoder';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  canMakePaymentCache = 'canMakePaymentCache';
  amount;
  pa: string;
  pn: string;
  mc: number;
  tn: string;
  tr: string;
  tid: string;
  url: string;
  constructor() {}

  ngOnInit() {}
  /**
   * Read data for supported instruments from input from.
   */
  readSupportedInstruments() {
    let formValue = {};
    formValue['pa'] = this.pa;
    formValue['pn'] = this.pn;
    formValue['tn'] = this.tn;
    formValue['mc'] = this.mc;
    formValue['tr'] = this.tr;
    formValue['tid'] = this.tid;
    formValue['url'] = this.url;
    return formValue;
  }

  /**
   * Read the amount from input form.
   */
  readAmount() {
    return this.amount;
  }

  /**
   * Launches payment request.
   */
  onBuyClicked() {
    let formValue = this.readSupportedInstruments();

    const supportedInstruments = [
      {
        supportedMethods: ['https://pwp-server.appspot.com/pay-dev'],
        data: formValue,
      },
      {
        supportedMethods: ['https://tez.google.com/pay'],
        data: formValue,
      },
    ];

    const details = {
      total: {
        label: 'Total',
        amount: {
          currency: 'INR',
          value: this.readAmount(),
        },
      },
      displayItems: [
        {
          label: 'Original amount',
          amount: {
            currency: 'INR',
            value: this.readAmount(),
          },
        },
      ],
      shippingOptions: []
    };

    const options = {
      requestShipping: true,
      requestPayerName: true,
      requestPayerPhone: true,
      requestPayerEmail: true,
      shippingType: 'shipping',
    };

    let request = null;
    try {
      request = new PaymentRequest(supportedInstruments, details, options);
    } catch (e) {
      console.log('Payment Request Error: ' + e.message);
      return;
    }
    if (!request) {
      console.log('Web payments are not supported in this browser.');
      return;
    }

    request.addEventListener('shippingaddresschange', function(evt) {
      evt.updateWith(new Promise(function(resolve) {
        fetch('/ship', {
          method: 'POST',
          headers: new Headers({'Content-Type': 'application/json'}),
          body: this.addressToJsonString(request.shippingAddress),
          credentials: 'include',
        })
            .then(function(options) {
              if (options.ok) {
                return options.json();
              }
              console.log('Unable to calculate shipping options.');
            })
            .then(function(optionsJson) {
              if (optionsJson.status === 'success') {
                this.updateShipping(
                    details, optionsJson.shippingOptions, resolve);
              } else {
                console.log('Unable to calculate shipping options.');
              }
            })
            .catch(function(err) {
              console.log('Unable to calculate shipping options. ' + err);
            });
      }));
    });

    request.addEventListener('shippingoptionchange', function(evt) {
      evt.updateWith(new Promise(function(resolve) {
        for (let i in details.shippingOptions) {
          if ({}.hasOwnProperty.call(details.shippingOptions, i)) {
            details.shippingOptions[i].selected =
                (details.shippingOptions[i].id === request.shippingOption);
          }
        }

        this.updateShipping(details, details.shippingOptions, resolve);
      }));
    });

    var canMakePaymentPromise = this.checkCanMakePayment(request);
    canMakePaymentPromise
        .then((result) => {
          this.showPaymentUI(request, result);
        })
        .catch((err) => {
          console.log('Error calling checkCanMakePayment: ' + err);
        });
  }

  /**
   * Checks whether can make a payment with Tez on this device. It checks the
   * session storage cache first and uses the cached information if it exists.
   * Otherwise, it calls canMakePayment method from the Payment Request object
   * and returns the result. The result is also stored in the session storage
   * cache for future use.
   *
   * @private
   * @param {PaymentRequest} request The payment request object.
   * @return {Promise} a promise containing the result of whether can make payment.
   */
  checkCanMakePayment(request) {
    // Checks canMakePayment cache, and use the cache result if it exists.
    if (sessionStorage.hasOwnProperty(this.canMakePaymentCache)) {
      return Promise.resolve(
          JSON.parse(sessionStorage[this.canMakePaymentCache]));
    }

    // If canMakePayment() isn't available, default to assuming that the method
    // is supported.
    var canMakePaymentPromise = Promise.resolve(true);

    // Feature detect canMakePayment().
    if (request.canMakePayment) {
      canMakePaymentPromise = request.canMakePayment();
    }

    return canMakePaymentPromise
        .then((result) => {
          // Store the result in cache for future usage.
          sessionStorage[this.canMakePaymentCache] = result;
          return result;
        })
        .catch((err) => {
          console.log('Error calling canMakePayment: ' + err);
        });
  }

  /**
   * Show the payment request UI.
   *
   * @private
   * @param {PaymentRequest} request The payment request object.
   * @param {Promise} canMakePayment The promise for whether can make payment.
   */
  showPaymentUI(request, canMakePayment) {
    // Redirect to play store if can't make payment.
    if (!canMakePayment) {
      this.redirectToPlayStore();
      return;
    }

    // Set payment timeout.
    let paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort()
          .then(function() {
            console.log('Payment timed out after 20 minutes.');
          })
          .catch(function() {
            console.log('Unable to abort, user is in the process of paying.');
          });
    }, 20 * 60 * 1000); /* 20 minutes */

    request.show()
        .then(function(instrument) {
          window.clearTimeout(paymentTimeout);
          this.processResponse(instrument);  // Handle response from browser.
        })
        .catch(function(err) {
          console.log(err);
        });
  }

  /**
   * Process the response from browser.
   *
   * @private
   * @param {PaymentResponse} instrument The payment instrument that was authed.
   */
  processResponse(instrument) {
    var instrumentString = this.instrumentToJsonString(instrument);
    console.log(instrumentString);

    fetch('/buy', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: instrumentString,
      credentials: 'include',
    })
        .then(function(buyResult) {
          if (buyResult.ok) {
            return buyResult.json();
          }
          console.log('Error sending instrument to server.');
        })
        .then(function(buyResultJson) {
          this.completePayment(
              instrument, buyResultJson.status, buyResultJson.message);
        })
        .catch(function(err) {
          console.log('Unable to process payment. ' + err);
        });
  }

  /**
   * Notify browser that the instrument authorization has completed.
   *
   * @private
   * @param {PaymentResponse} instrument The payment instrument that was authed.
   * @param {string} result Whether the auth was successful. Should be either
   * 'success' or 'fail'.
   * @param {string} msg The message to log in console.
   */
  completePayment(instrument, result, msg) {
    instrument.complete(result)
        .then(function() {
          console.log('Payment completes.');
          console.log(msg);
          document.getElementById('inputSection').style.display = 'none'
          document.getElementById('outputSection').style.display = 'block'
          document.getElementById('response').innerHTML =
              JSON.stringify(instrument, undefined, 2);
        })
        .catch(function(err) {
          console.log(err);
        });
  }

  /** Redirect to PlayStore. */
  redirectToPlayStore() {
    if (confirm('Tez not installed, go to play store and install?')) {
      window.location.href =
          'https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user.alpha'
    };
  }

  /**
   * Converts the shipping address into a JSON string.
   *
   * @private
   * @param {PaymentAddress} address The address to convert.
   * @return {string} The string representation of the address.
   */
  addressToJsonString(address) {
    var addressDictionary = address.toJSON ? address.toJSON() : {
      recipient: address.recipient,
      organization: address.organization,
      addressLine: address.addressLine,
      dependentLocality: address.dependentLocality,
      city: address.city,
      region: address.region,
      postalCode: address.postalCode,
      sortingCode: address.sortingCode,
      country: address.country,
      phone: address.phone,
    };
    return JSON.stringify(addressDictionary, undefined, 2);
  }

  /**
   * Converts the payment instrument into a JSON string.
   *
   * @private
   * @param {PaymentResponse} instrument The instrument to convert.
   * @return {string} The string representation of the instrument.
   */
  instrumentToJsonString(instrument) {
    // PaymentResponse is an interface, JSON.stringify works only on
    // dictionaries.
    var instrumentDictionary = {
      methodName: instrument.methodName,
      details: instrument.details,
      shippingAddress: this.addressToJsonString(instrument.shippingAddress),
      shippingOption: instrument.shippingOption,
      payerName: instrument.payerName,
      payerPhone: instrument.payerPhone,
      payerEmail: instrument.payerEmail,
    };
    return JSON.stringify(instrumentDictionary, undefined, 2);
  }

  /**
   * Update order details with shipping information.
   *
   * @private
   * @param {PaymentDetails} details The details for payment.
   * @param {Array} shippingOptions The shipping options.
   * @param {function} callback The callback to invoke.
   */
  updateShipping(details, shippingOptions, callback) {
    let selectedShippingOption;
    for (let i in shippingOptions) {
      if (shippingOptions[i].selected) {
        selectedShippingOption = shippingOptions[i];
      }
    }

    var total = parseFloat(this.readAmount());
    if (selectedShippingOption) {
      let shippingPrice = Number(selectedShippingOption.amount.value);
      total = total + shippingPrice;
    }

    details.shippingOptions = shippingOptions;
    details.total.amount.value = total.toFixed(2);
    if (selectedShippingOption) {
      details.displayItems.splice(
          1, details.displayItems.length == 1 ? 0 : 1, selectedShippingOption);
    }

    callback(details);
  }
}
