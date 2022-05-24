    "use strict";
    $(document).ready(function() {
      (function(W,D){
        W.config = {
          url: '',
          page: 'p/go.html',
          output: '#output',
          gotolink: '#gotolink',  
          defaultkey: 'maxbong',
          fixednavbar: false,
          countdown: true,
          click2x: true,  
          timedown: 10,
          lang: {
            urlempty: "URL can not empty",
            convertsuccess: "Convert URL success, copy url on box below",
            validtext: "HTTP, HTTPS, or WWW",
            gourltext: "Click here to go",
            nourl: "No URL here",
            errorconvert: "URL can not to convert",
            emptypass: "Password can not empty",
            wrongpass: "Password is incorrect",
            countdowntext: "Please Wait <span class='countdown fs-3 text-danger'>{{anascountdown}}</span> Seconds"
          }
        }
          W.validurlit = function (ur) {
            return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(ur);
          }
          W.sUp = function(el) {
            D.querySelector(el).parentNode.style.height = '0';
          }
          W._GET = function(name, url) {
            if (!url) url = location.href;
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
             
            return results == null ? null : results[1];
       
          }
      }(window,document));
    });
      
    //Tea init
    'use strict';
    class Tea {
        static encrypt(plaintext, password) {
            plaintext = String(plaintext);
            password = String(password);
            if (plaintext.length == 0) return('');
            const v = Tea.strToLongs(Tea.utf8Encode(plaintext));
            const k = Tea.strToLongs(Tea.utf8Encode(password).slice(0,16));
            const cipher = Tea.encode(v, k);
            const ciphertext = Tea.longsToStr(cipher);
            const cipherbase64 = Tea.base64Encode(ciphertext);
            return cipherbase64;
        }
        static decrypt(ciphertext, password) {
            ciphertext = String(ciphertext);
            password = String(password);
            if (ciphertext.length == 0) return('');
            const v = Tea.strToLongs(Tea.base64Decode(ciphertext));
            const k = Tea.strToLongs(Tea.utf8Encode(password).slice(0,16));
            const plain = Tea.decode(v, k);
            const plaintext = Tea.longsToStr(plain);
            const plainUnicode = Tea.utf8Decode(plaintext.replace(/\0+$/,''));
            return plainUnicode;
    
        }
        static encode(v, k) {
            if (v.length < 2) v[1] = 0;
            const n = v.length;
            const delta = 0x9e3779b9;
            let q = Math.floor(6 + 52/n);
            let z = v[n-1], y = v[0];
            let mx, e, sum = 0;
            while (q-- > 0) {
                sum += delta;
                e = sum>>>2 & 3;
                for (let p = 0; p < n; p++) {
                    y = v[(p+1)%n];
                    mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
                    z = v[p] += mx;
                }
            }
            return v;
        }
        static decode(v, k) {
            const n = v.length;
            const delta = 0x9e3779b9;
            const q = Math.floor(6 + 52/n);
            let z = v[n-1], y = v[0];
            let mx, e, sum = q*delta;
            while (sum != 0) {
                e = sum>>>2 & 3;
                for (let p = n-1; p >= 0; p--) {
                    z = v[p>0 ? p-1 : n-1];
                    mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
                    y = v[p] -= mx;
                }
                sum -= delta;
            }
            return v;
        }
        static strToLongs(s) {
            const l = new Array(Math.ceil(s.length/4));
            for (let i=0; i<l.length; i++) {
                l[i] = s.charCodeAt(i*4)        + (s.charCodeAt(i*4+1)<<8) +
                    (s.charCodeAt(i*4+2)<<16) + (s.charCodeAt(i*4+3)<<24);
            }
            return l;
        }
        static longsToStr(l) {
            let str = '';
            for (let i=0; i<l.length; i++) {
                str += String.fromCharCode(l[i] & 0xff, l[i]>>>8 & 0xff, l[i]>>>16 & 0xff, l[i]>>>24 & 0xff);
            }
            return str;
        }
        static utf8Encode(str) {
            return unescape(encodeURIComponent(str));
        }
        static utf8Decode(utf8Str) {
            try {
                return decodeURIComponent(escape(utf8Str));
            } catch (e) {
                return utf8Str;
            }
        }
        static base64Encode(str) {
            if (typeof btoa != 'undefined') return btoa(str);
            if (typeof Buffer != 'undefined') return new Buffer(str, 'binary').toString('base64');
            throw new Error('No Base64 Encode');
        }
        static base64Decode(b64Str) {
            if (typeof atob == 'undefined' && typeof Buffer == 'undefined') throw new Error('No base64 decode');
            try {
                if (typeof atob != 'undefined') return atob(b64Str);
                if (typeof Buffer != 'undefined') return new Buffer(b64Str, 'base64').toString('binary');
            } catch (e) {
                throw new Error('Invalid ciphertext');
            }
        }
    }
      /* - - - - - - - - - - - - -  */
      if (typeof module != 'undefined' && module.exports) module.exports = Tea; // ≡ export default Tea;
      $("<ins class='adsbygoogle' style='display:block;' data-ad-format='auto' data-ad-client='ca-pub-9828917563735047' data-ad-slot='8821334006' data-full-width-responsive='true'></ins>").insertAfter(".decryptbox");
      $("<ins class='adsbygoogle' style='display:block;;width:300px;height:600px;margin: auto;' data-ad-format='auto' data-ad-layout='in-article' data-ad-client='ca-pub-9828917563735047' data-ad-slot='7486811850'></ins>").insertBefore("#gotolink");
      "use strict";
      if (!String.prototype.startsWith) {
          Object.defineProperty(String.prototype, 'startsWith', {
              value: function(search, pos) {
                  pos = !pos || pos < 0 ? 0 : +pos;
                  return this.substring(pos, pos + search.length) === search;
              }
          });
      }
      $(document).ready(function(){
        $(document).on('submit', '#locked', function(e) {
          e.preventDefault();
          var $this = $(this),
          parent = $this.parent(),
          report = parent.find('#report'),
          passin = $('#passin');
          var data;
          try {
            data = JSON.parse(Tea.decrypt(decodeURIComponent((_GET('u'))), passin[0].value));window.history.pushState({}, document.title, document.location.pathname);
          } catch (e) {
            data = false;
          }
          if (passin[0].value.length) {
            if (typeof(data) === "object") {
                if(data.note){$('.decryptbox').append('<span class="alert alert-success pt-0 pb-0 mb-1">' + data.note + '</span>')};
                if(!data.countdown){
                  report[0].innerHTML = '<div class="text-center"><a class="btn btn-primary mb-2 pt-0 pb-0" href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                  $this.find('button, input').attr('disabled', 'disabled');
                  $this.slideUp('slow');
                } else {
                  $this.find('button, input').attr('disabled', 'disabled');
                  $this.slideUp('slow');
                  let downloadTimer;
                  var timeleft = config.timedown;
                  downloadTimer = setInterval(countDown,1000)
                  function countDown(){
                      var ANasRMunDurin = config.lang.countdowntext.replace('{{anascountdown}}', timeleft);
                      report[0].innerHTML = '<div class="fs-6 mb-2 text-center text-success">' + ANasRMunDurin + '</div>';
                      setTimeout(function(){
                        report[0].parentNode.style.height = (report[0].offsetHeight+5)+'px';
                        }, 0);
                      timeleft -= 1;
                      if(timeleft <= 0){
                        clearInterval(downloadTimer);
                        report[0].innerHTML = '<button class="btn btn-primary mb-2 pt-1 pb-1">Getlink</button>';
                        if(!config.click2x){
                          report[0].innerHTML = '<div class="text-center"><a class="btn btn-primary mb-2 pt-0 pb-0" href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                        } else {
                          function gotolinkcountdown() {
                            var o = 5;
                            $("#gotolink").removeClass("hidden").addClass("mt-2 mb-2");
                            var n = setInterval(function() {
                                var e = o -= 1;
                               $("#gotolink").html('<svg id="i-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"><circle cx="16" cy="16" r="14" /><path d="M16 8 L16 16 20 20" /></svg> Please Wait...'), e < 0 && (clearInterval(n), $("#gotolink").prop("disabled", !1), $("#gotolink").html('<svg id="i-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"><path d="M2 20 L12 28 30 4" /></svg> Go to Destination Link'),$(config.gotolink).click(function(){var o = (data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url; window.open(o,'_blank')}))
                            }, 1e3)
                            }
                          var request = !1;
                          $("#output button").click(function() { 0 == request && (gotolinkcountdown(), request = !0),$("html, body").animate({ scrollTop: $('#gotolink').offset().top -20 }, 1000),$("#output button").prop( "disabled", true );$(config.gotolink).prop( "disabled", true ).css("display","block").off('click');});
                        }
                      }
                    }
                    $(window).blur(function(){
                      clearInterval(downloadTimer);
                      downloadTimer = 0;
                    });
                    $(window).focus(function(){
                      if (!downloadTimer)
                      downloadTimer = setInterval(countDown,1000);
                    });
                }
            } else {
              report[0].innerHTML = '<div class="alert alert-danger text-center">'+config.lang.wrongpass+'</div>';
            }
          } else {
               report[0].innerHTML = '<div class="alert alert-danger text-center">'+config.lang.emptypass+'</div>';
          }
          setTimeout(function(){
            report[0].parentNode.style.height = report[0].offsetHeight+'px';
            }, 0);
        });
        if (_GET('u') && $(config.output).length) {
          var data;
          try {
              data = JSON.parse(Tea.decrypt(decodeURIComponent((_GET('u'))), config.defaultkey));window.history.pushState({}, document.title, document.location.pathname);
          } catch (e) {
              data = false;
          }
          if (typeof(data) === "object") {
            if(data.note){$('.decryptbox').append('<span class="alert alert-success pt-0 pb-0 mb-1">' + data.note + '</span>')};
            if(!data.countdown){
              $(config.output)[0].innerHTML = '<div class="text-center"><a class="text-center"  href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
            } else {
              let downloadTimer;
              var timeleft = config.timedown;
              downloadTimer = setInterval(countDown,1000)
              function countDown(){
                var ANasRMunDurin = config.lang.countdowntext.replace('{{anascountdown}}', timeleft);
                $(config.output)[0].innerHTML = '<div class="fs-6 mb-2 text-center text-success">' + ANasRMunDurin + '</div>';    
                timeleft -= 1;
                if(timeleft <= 0){
                  clearInterval(downloadTimer);
                  $(config.output)[0].innerHTML = '<button class="btn btn-primary mb-2 pt-1 pb-1">Getlink</button>';
                  if(!config.click2x){
                    $(config.output)[0].innerHTML = '<div class="text-center"><a class="text-center" href="javascript:void(0)" onclick="location.href=&#39;'+(data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url+'&#39;">'+config.lang.gourltext+'</a></div>';
                  } else {
                    function gotolinkcountdown() {
                      var o = 5;
                      $("#gotolink").removeClass("hidden").addClass("mt-2 mb-2");
                      var n = setInterval(function() {
                         var e = o -= 1;
                         $("#gotolink").html('<svg id="i-clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="14" height="14" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="6"><circle cx="16" cy="16" r="14" /><path d="M16 8 L16 16 20 20" /></svg> Please Wait...'), e < 0 && (clearInterval(n), $("#gotolink").prop("disabled", !1), $("#gotolink").html('<svg id="i-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="12" height="12" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"><path d="M2 20 L12 28 30 4" /></svg> Go to Destination Link'),$(config.gotolink).click(function(){var o = (data.url.toLowerCase().startsWith('www.') ? '//' : '')+''+data.url; window.open(o,'_blank')}))
                      }, 1e3)
                    }
                    var request = !1;
                    $("#output button").click(function() { 0 == request && (gotolinkcountdown(), request = !0),$("html, body").animate({ scrollTop: $('#gotolink').offset().top -20 }, 1000),$("#output button").prop( "disabled", true );$(config.gotolink).prop( "disabled", true ).css("display","block").off('click');});
                  }
                }
              }                         
              $(window).blur(function(){
                clearInterval(downloadTimer);
                downloadTimer = 0;
              });
              $(window).focus(function(){
                if (!downloadTimer)
                downloadTimer = setInterval(countDown,1000);
              });
            }
          } else {
            $(config.output)[0].innerHTML = '<form class="form-group" id="locked"><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><svg fill="none" height="24" id="i-lock" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23"/>    <circle cx="16" cy="24" r="1"/></svg></span></div><input class="form-control" name="pass" type="password" id="passin" onclick="sUp(\'#report\')" onkeypress="sUp(\'#report\')" aria-label="Password" /><div class="input-group-append"><button class="btn btn-primary" type="submit">Unlock</button></div></div></form><section class="trans" style="overflow: hidden;height: 0"><div id="report"></div></section>';
          }
        } else {
          if($(config.output).length){
            $(config.output)[0].innerHTML = '<div class="text-center">'+config.lang.nourl+'</div>';
          } else {
            console.log('Not found output element, are you sure you this is not safelink page ??');
          }
        }
      });
    
