window.onload = function () {
    var form = document.querySelector('.main-form'),
        numbers = document.querySelector('input[name="numbers"]'),
        letters = document.querySelector('input[name="letters"]'),
        agreement = document.querySelector('input[name="agreement"]'),
        types = document.querySelectorAll('input[name="type"]'),
        lastType = document.querySelector('input[value="last"]');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var type = 0;

        for(var i = 0; i < types.length; i++) {
            if(types[i].checked === true) {
                type = types[i];
            }
        }

        var param = {
            num: numbers.value,
            let: letters.value,
            agr: agreement.chechecked,
            typ: type.value
        };

        ajaxPost('POST', '/test', param, function (data) {
            if(data.status === 500) {
                setError(data);
            } else {
                setSuccess(data);
            }
        })
    });

    function ajaxPost(method, url, param, callback) {
        var f = callback || function (data) {};
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if(this.readyState === 4) {
                if((this.status === 200)) {
                    var success = JSON.parse(this.responseText);
                    f(success);
                } else {
                    var error = JSON.parse(this.responseText);
                    error.status = this.status;
                    f(error);
                }
            }
        };

        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(param));
    }

    function setSuccess(success) {
        var btn = document.querySelector('form button');
        numbers.classList.remove('error');
        letters.classList.remove('error');

        var erNumRemove = document.querySelector('.er-num');
        if (erNumRemove) {
            erNumRemove.remove();
        }
        var erLetRemove = document.querySelector('.er-let');
        if (erLetRemove) {
            erLetRemove.remove();
        }
        var erAgrRemove = document.querySelector('.er-agr');
        if (erAgrRemove) {
            erAgrRemove.remove();
        }
        var erTypRemove = document.querySelector('.er-typ');
        if (erTypRemove) {
            erTypRemove.remove();
        }

        var successBlock = document.createElement('div');
        successBlock.className = 'success';
        successBlock.innerHTML = success.message;
        insertAfter(successBlock, btn)
    }

    function setError(error) {
        numbers.classList.remove('error');
        letters.classList.remove('error');

        if (document.querySelector('.success')) {
            document.querySelector('.success').remove();
        }

        if (error.num) {
            numbers.classList.add('error');
            if (!document.querySelector('.er-num')) {
                var erNum = document.createElement('div');
                erNum.className = 'er-num';
                erNum.innerHTML = error.num;
                insertAfter(erNum, numbers);
            }
        } else {
            var erNumRemove = document.querySelector('.er-num');
            if (erNumRemove) {
                erNumRemove.remove();
            }
        }

        if (error.let) {
            letters.classList.add('error');
            if (!document.querySelector('.er-let')) {
                var erLet = document.createElement('div');
                erLet.className = 'er-let';
                erLet.innerHTML = error.let;
                insertAfter(erLet, letters);
            }
        } else {
            var erLetRemove = document.querySelector('.er-let');
            if (erLetRemove) {
                erLetRemove.remove();
            }
        }

        if (error.agr) {
            if (!document.querySelector('.er-agr')) {
                var erAgr = document.createElement('div');
                erAgr.className = 'er-agr';
                erAgr.innerHTML = error.agr;
                insertAfter(erAgr, agreement);
            }
        } else {
            var erAgrRemove = document.querySelector('.er-agr');
            if (erAgrRemove) {
                erAgrRemove.remove();
            }
        }

        if (error.typ) {
            if (!document.querySelector('.er-typ')) {
                var erTyp = document.createElement('div');
                erTyp.className = 'er-typ';
                erTyp.innerHTML = error.typ;
                insertAfter(erTyp, lastType);
            }
        } else {
            var erTypRemove = document.querySelector('.er-typ');
            if (erTypRemove) {
                erTypRemove.remove();
            }
        }
        alert('Error server: ' + error.status);
    }

    function insertAfter(elem, refElem) {
        return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }
};