const Keyboard = {
  field: null,

  languages: {
    en: [
      { small: '`', shift: '~', code: 'Backquote' },
      { small: '1', shift: '!', code: 'Digit1' },
      { small: '2', shift: '@', code: 'Digit2' },
      { small: '3', shift: '#', code: 'Digit3' },
      { small: '4', shift: '$', code: 'Digit4' },
      { small: '5', shift: '%', code: 'Digit5' },
      { small: '6', shift: '^', code: 'Digit6' },
      { small: '7', shift: '&', code: 'Digit7' },
      { small: '8', shift: '*', code: 'Digit8' },
      { small: '9', shift: '(', code: 'Digit9' },
      { small: '0', shift: ')', code: 'Digit0' },
      { small: '-', shift: '_', code: 'Minus' },
      { small: '=', shift: '+', code: 'Equal' },
      { small: 'Backspace', shift: null, code: 'Backspace' },
      { small: 'q', shift: 'Q', code: 'KeyQ' },
      { small: 'w', shift: 'W', code: 'KeyW' },
      { small: 'e', shift: 'E', code: 'KeyE' },
      { small: 'r', shift: 'R', code: 'KeyR' },
      { small: 't', shift: 'T', code: 'KeyT' },
      { small: 'y', shift: 'Y', code: 'KeyY' },
      { small: 'u', shift: 'U', code: 'KeyU' },
      { small: 'i', shift: 'I', code: 'KeyI' },
      { small: 'o', shift: 'O', code: 'KeyO' },
      { small: 'p', shift: 'P', code: 'KeyP' },
      { small: '[', shift: '{', code: 'BracketLeft' },
      { small: ']', shift: '}', code: 'BracketRight' },
      { small: '\\', shift: '|', code: 'Backslash' },
      { small: 'CapsLock', shift: null, code: 'CapsLock' },
      { small: 'a', shift: 'A', code: 'KeyA' },
      { small: 's', shift: 'S', code: 'KeyS' },
      { small: 'd', shift: 'D', code: 'KeyD' },
      { small: 'f', shift: 'F', code: 'KeyF' },
      { small: 'g', shift: 'G', code: 'KeyG' },
      { small: 'h', shift: 'H', code: 'KeyH' },
      { small: 'j', shift: 'J', code: 'KeyJ' },
      { small: 'k', shift: 'K', code: 'KeyK' },
      { small: 'l', shift: 'L', code: 'KeyL' },
      { small: ';', shift: ':', code: 'Semicolon' },
      { small: "'", shift: '"', code: 'Quote' },
      { small: 'Enter', shift: null, code: 'Enter' },
      { small: 'Done', shift: null, code: 'Done' },
      { small: 'z', shift: 'Z', code: 'KeyZ' },
      { small: 'x', shift: 'X', code: 'KeyX' },
      { small: 'c', shift: 'C', code: 'KeyC' },
      { small: 'v', shift: 'V', code: 'KeyV' },
      { small: 'b', shift: 'B', code: 'KeyB' },
      { small: 'n', shift: 'N', code: 'KeyN' },
      { small: 'm', shift: 'M', code: 'KeyM' },
      { small: ',', shift: '<', code: 'Comma' },
      { small: '.', shift: '>', code: 'Period' },
      { small: '/', shift: '?', code: 'Slash' },
      { small: 'Shift', shift: null, code: 'Shift' },
      { small: 'En', shift: null, code: 'Language' },
      { small: 'Microphone', shift: null, code: 'Microphone' },
      { small: 'Sound', shift: null, code: 'Sound' },
      { small: 'Space', shift: null, code: 'Space' },
      { small: 'ArrowLeft', shift: null, code: 'ArrowLeft' },
      { small: 'ArrowRight', shift: null, code: 'ArrowRight' },
    ],
    ru: [
      { small: 'ё', shift: 'Ё', code: 'Backquote' },
      { small: '1', shift: '!', code: 'Digit1' },
      { small: '2', shift: '"', code: 'Digit2' },
      { small: '3', shift: '№', code: 'Digit3' },
      { small: '4', shift: ';', code: 'Digit4' },
      { small: '5', shift: '%', code: 'Digit5' },
      { small: '6', shift: ':', code: 'Digit6' },
      { small: '7', shift: '?', code: 'Digit7' },
      { small: '8', shift: '*', code: 'Digit8' },
      { small: '9', shift: '(', code: 'Digit9' },
      { small: '0', shift: ')', code: 'Digit0' },
      { small: '-', shift: '_', code: 'Minus' },
      { small: '=', shift: '+', code: 'Equal' },
      { small: 'Backspace', shift: null, code: 'Backspace' },
      { small: 'й', shift: 'Й', code: 'KeyQ' },
      { small: 'ц', shift: 'Ц', code: 'KeyW' },
      { small: 'у', shift: 'У', code: 'KeyE' },
      { small: 'к', shift: 'К', code: 'KeyR' },
      { small: 'е', shift: 'Е', code: 'KeyT' },
      { small: 'н', shift: 'Н', code: 'KeyY' },
      { small: 'г', shift: 'Г', code: 'KeyU' },
      { small: 'ш', shift: 'Ш', code: 'KeyI' },
      { small: 'щ', shift: 'Щ', code: 'KeyO' },
      { small: 'з', shift: 'З', code: 'KeyP' },
      { small: 'х', shift: 'Х', code: 'BracketLeft' },
      { small: 'ъ', shift: 'Ъ', code: 'BracketRight' },
      { small: '\\', shift: '/', code: 'Backslash' },
      { small: 'CapsLock', shift: null, code: 'CapsLock' },
      { small: 'ф', shift: 'Ф', code: 'KeyA' },
      { small: 'ы', shift: 'Ы', code: 'KeyS' },
      { small: 'в', shift: 'В', code: 'KeyD' },
      { small: 'а', shift: 'А', code: 'KeyF' },
      { small: 'п', shift: 'П', code: 'KeyG' },
      { small: 'р', shift: 'Р', code: 'KeyH' },
      { small: 'о', shift: 'О', code: 'KeyJ' },
      { small: 'л', shift: 'Л', code: 'KeyK' },
      { small: 'д', shift: 'Д', code: 'KeyL' },
      { small: 'ж', shift: 'Ж', code: 'Semicolon' },
      { small: 'э', shift: 'Э', code: 'Quote' },
      { small: 'Enter', shift: null, code: 'Enter' },
      { small: 'Done', shift: null, code: 'Done' },
      { small: 'я', shift: 'Я', code: 'KeyZ' },
      { small: 'ч', shift: 'Ч', code: 'KeyX' },
      { small: 'с', shift: 'С', code: 'KeyC' },
      { small: 'м', shift: 'М', code: 'KeyV' },
      { small: 'и', shift: 'И', code: 'KeyB' },
      { small: 'т', shift: 'Т', code: 'KeyN' },
      { small: 'ь', shift: 'Ь', code: 'KeyM' },
      { small: 'б', shift: 'Б', code: 'Comma' },
      { small: 'ю', shift: 'Ю', code: 'Period' },
      { small: '.', shift: ',', code: 'Slash' },
      { small: 'Shift', shift: null, code: 'Shift' },
      { small: 'En', shift: null, code: 'Language' },
      { small: 'Microphone', shift: null, code: 'Microphone' },
      { small: 'Sound', shift: null, code: 'Sound' },
      { small: 'Space', shift: null, code: 'Space' },
      { small: 'ArrowLeft', shift: null, code: 'ArrowLeft' },
      { small: 'ArrowRight', shift: null, code: 'ArrowRight' },
    ],
  },

  elements: {
    main: null,
    keysContainer: null,
    keys: [],
    recognition: null,
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    lang: 'en',
    value: '',
    cursorPosition: 0,
    capsLock: false,
    shift: false,
    keyboardShift: true,
    sound: true,
    microphone: false,
  },

  sounds: {
    shift: new Audio('shift.mp3'),
    capsLock: new Audio('capslock.mp3'),
    backspace: new Audio('backspace.mp3'),
    enter: new Audio('enter.mp3'),
    mic_on: new Audio('mic-on.mp3'),
    mic_off: new Audio('mic-off.mp3'),
    default: { en: new Audio('en-default.mp3'), ru: new Audio('ru-default.mp3') },
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard_hidden');
    this.elements.main.dataset.language = this.properties.lang;
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    window.addEventListener('keydown', (e) => {
      const keyCode = e.code;
      let key = Array.from(this.elements.keys).find((button) => button.dataset.code === keyCode);
      if (key) {
        key.classList.add('keyboard__key_pressed');
        if (keyCode === 'CapsLock') {
          key.click();
        }
      } else if (keyCode.match(/shift/i)) {
        if (this.properties.keyboardShift) {
          this.properties.keyboardShift = false;
          key = Array.from(this.elements.keys).find((button) => button.dataset.code === 'Shift');
          key.click();
          key.classList.add('keyboard__key_pressed');
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      const keyCode = e.code;
      let key = Array.from(this.elements.keys).find((button) => button.dataset.code === keyCode);
      if (key) {
        key.classList.remove('keyboard__key_pressed');
      } else if (keyCode.match(/shift/i)) {
        this.properties.keyboardShift = true;
        key = Array.from(this.elements.keys).find((button) => button.dataset.code === 'Shift');
        key.click();
        key.classList.remove('keyboard__key_pressed');
      }
    });

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();
    this.elements.recognition = recognition;
    this.elements.recognition.addEventListener('result', (e) => {
      const transcript = (Array.from(e.results)).map((item) => item[0]).map((el) => el.transcript).join('');
      if (e.results[0].isFinal) {
        this.properties.value += (this.properties.value === '') ? `${transcript}` : ` ${transcript}`;
        this.properties.cursorPosition += transcript.length + 1;
        this.triggerEvent('oninput');
      }
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['Done', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'Shift'],
      ['Language', 'Microphone', 'Sound', 'Space', 'ArrowLeft', 'ArrowRight'],
    ];

    const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

    keyLayout.forEach((row) => {
      const keyRow = document.createElement('div');
      keyRow.classList.add('keyboard__row');
      row.forEach((keyCode) => {
        const keyObj = this.languages[this.properties.lang].find((key) => key.code === keyCode);
        const keyElement = document.createElement('button');
        keyElement.setAttribute('type', 'button');
        keyElement.classList.add('keyboard__key');
        keyElement.dataset.code = keyCode;
        const sub = document.createElement('div');
        sub.classList.add('sub');
        if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
          sub.textContent = keyObj.shift;
        } else {
          sub.textContent = '';
        }
        keyElement.appendChild(sub);
        const letter = document.createElement('div');
        letter.classList.add('letter');

        switch (keyCode) {
          case 'Backspace':
            keyElement.classList.add('keyboard__key_wide');
            letter.innerHTML = createIconHTML('backspace');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) {
                this.soundPlay(this.sounds.backspace);
              }
              this.field.focus();

              const cursorPos = this.field.selectionStart;
              const leftFromCursor = this.properties.value.slice(0, cursorPos);
              const rightFromCursor = this.properties.value.slice(cursorPos);
              const string = leftFromCursor.substring(0, leftFromCursor.length - 1);
              this.properties.value = string + rightFromCursor;

              this.properties.cursorPosition = cursorPos - 1;
              this.triggerEvent('oninput');
            });
            break;

          case 'Enter':
            keyElement.classList.add('keyboard__key_wide');
            letter.innerHTML = createIconHTML('keyboard_return');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.enter);
              this.field.focus();

              const cursorPos = this.field.selectionStart;
              const leftFromCursor = this.properties.value.slice(0, cursorPos);
              const rightFromCursor = this.properties.value.slice(cursorPos);

              this.properties.value = `${leftFromCursor}\n${rightFromCursor}`;

              this.properties.cursorPosition = cursorPos + 1;
              this.triggerEvent('oninput');
            });
            break;

          case 'Space':
            keyElement.classList.add('keyboard__key_extra-wide');
            letter.innerHTML = createIconHTML('space_bar');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.default[this.properties.lang]);
              this.field.focus();

              const cursorPos = this.field.selectionStart;
              const leftFromCursor = this.properties.value.slice(0, cursorPos);
              const rightFromCursor = this.properties.value.slice(cursorPos);

              this.properties.value = `${leftFromCursor} ${rightFromCursor}`;

              this.properties.cursorPosition = cursorPos + 1;
              this.triggerEvent('oninput');
            });
            break;

          case 'Done':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
            letter.innerHTML = createIconHTML('check_circle');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.default[this.properties.lang]);
              this.close();
              this.triggerEvent('onclose');
            });
            break;

          case 'CapsLock':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activatable');
            letter.innerHTML = createIconHTML('keyboard_capslock');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.capsLock);
              this.field.focus();
              this.toggleCapsLock();
              keyElement.classList.toggle('keyboard__key_active', this.properties.capsLock);
            });
            break;

          case 'Shift':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activatable');
            letter.innerHTML = createIconHTML('north');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.shift);
              this.field.focus();
              this.toggleShift();
              keyElement.classList.toggle('keyboard__key_active', this.properties.shift);
            });
            break;

          case 'Language':
            keyElement.classList.add('keyboard__key_wide');
            letter.textContent = this.properties.lang.toUpperCase();
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.default[this.properties.lang]);
              this.field.focus();
              this.toggleLanguage();
              letter.textContent = this.properties.lang.toUpperCase();
            });
            break;

          case 'Microphone':
            keyElement.classList.add('keyboard__key_wide');
            letter.innerHTML = createIconHTML('mic_off');
            keyElement.addEventListener('click', () => {
              this.field.focus();
              this.toggleRecognizeSpeech();
              letter.innerHTML = this.properties.microphone ? createIconHTML('mic') : createIconHTML('mic_off');
              if (this.properties.sound) {
                const music = this.properties.microphone ? this.sounds.mic_on : this.sounds.mic_off;
                this.soundPlay(music);
              }
            });
            break;

          case 'Sound':
            keyElement.classList.add('keyboard__key_wide');
            letter.innerHTML = createIconHTML('music_note');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.default[this.properties.lang]);
              this.field.focus();
              this.toggleSound();
              letter.innerHTML = this.properties.sound ? createIconHTML('music_note') : createIconHTML('music_off');
            });
            break;

          case 'ArrowLeft':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_colored');
            letter.innerHTML = createIconHTML('arrow_back');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) this.soundPlay(this.sounds.default[this.properties.lang]);
              this.field.focus();
              this.arrowLeft();
            });
            break;

          case 'ArrowRight':
            keyElement.classList.add('keyboard__key_wide', 'keyboard__key_colored');
            letter.innerHTML = createIconHTML('arrow_forward');
            keyElement.addEventListener('click', () => {
              if (this.properties.sound) {
                this.soundPlay(this.sounds.default[this.properties.lang]);
              }
              this.field.focus();
              this.arrowRight();
            });
            break;

          default:
            letter.textContent = keyObj.small;

            keyElement.addEventListener('click', (e) => {
              if (this.properties.sound) {
                this.soundPlay(this.sounds.default[this.properties.lang]);
              }
              this.field.focus();
              const cursorPos = this.field.selectionStart;
              const leftFromCursor = this.properties.value.slice(0, cursorPos);
              const rightFromCursor = this.properties.value.slice(cursorPos);

              const keyCodeAttr = e.currentTarget.dataset.code;
              const langObj = this.languages[this.properties.lang];
              const keyO = langObj.find((key) => key.code === keyCodeAttr);

              if (this.properties.capsLock && this.properties.shift) {
                if (keyO.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
                  this.properties.value = leftFromCursor + keyO.shift + rightFromCursor;
                } else {
                  this.properties.value = leftFromCursor + keyO.small + rightFromCursor;
                }
              } else if (this.properties.capsLock) {
                this.properties.value = leftFromCursor + keyO.small.toUpperCase() + rightFromCursor;
              } else if (this.properties.shift) {
                this.properties.value = leftFromCursor + keyO.shift + rightFromCursor;
              } else {
                this.properties.value = leftFromCursor + keyO.small + rightFromCursor;
              }
              this.properties.cursorPosition = cursorPos + 1;
              this.triggerEvent('oninput');
            });
            break;
        }

        keyElement.appendChild(letter);
        keyRow.appendChild(keyElement);
      });

      fragment.appendChild(keyRow);
    });

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value, this.properties.cursorPosition);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    this.elements.keys.forEach((button) => {
      const btnReassigned = button;
      const keyObj = this.languages[this.properties.lang]
        .find((key) => key.code === btnReassigned.dataset.code);
      if (this.properties.shift) {
        if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
          btnReassigned.childNodes[0].textContent = keyObj.small;
          btnReassigned.childNodes[1].textContent = keyObj.shift;
        } else if (keyObj.shift) {
          btnReassigned.childNodes[0].textContent = '';
          btnReassigned.childNodes[1].textContent = this.properties.capsLock ? keyObj.small
            : keyObj.shift;
        }
      } else if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
        btnReassigned.childNodes[0].textContent = keyObj.shift;
        btnReassigned.childNodes[1].textContent = keyObj.small;
      } else if (keyObj.shift) {
        btnReassigned.childNodes[0].textContent = '';
        btnReassigned.childNodes[1].textContent = this.properties.capsLock ? keyObj.shift
          : keyObj.small;
      }
    });
  },

  toggleShift() {
    this.properties.shift = !this.properties.shift;

    this.elements.keys.forEach((button) => {
      const btnReassigned = button;
      const keyObj = this.languages[this.properties.lang]
        .find((key) => key.code === btnReassigned.dataset.code);
      if (this.properties.capsLock) {
        if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
          btnReassigned.childNodes[0].textContent = this.properties.shift ? keyObj.small
            : keyObj.shift;
          btnReassigned.childNodes[1].textContent = this.properties.shift ? keyObj.shift
            : keyObj.small;
        } else if (keyObj.shift) {
          btnReassigned.childNodes[0].textContent = '';
          btnReassigned.childNodes[1].textContent = this.properties.shift ? keyObj.small
            : keyObj.shift;
        }
      } else if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
        btnReassigned.childNodes[0].textContent = this.properties.shift ? keyObj.small
          : keyObj.shift;
        btnReassigned.childNodes[1].textContent = this.properties.shift ? keyObj.shift
          : keyObj.small;
      } else if (keyObj.shift) {
        btnReassigned.childNodes[0].textContent = '';
        btnReassigned.childNodes[1].textContent = this.properties.shift ? keyObj.shift
          : keyObj.small;
      }
    });
  },

  toggleLanguage() {
    const langAbbr = Object.keys(this.languages);
    const langInd = langAbbr.indexOf(this.elements.main.dataset.language);
    const newLangInd = (langInd + 1 < langAbbr.length) ? langInd + 1 : 0;
    this.elements.main.dataset.language = langAbbr[newLangInd];
    this.properties.lang = langAbbr[newLangInd];

    this.elements.keys.forEach((button) => {
      const btnReassigned = button;
      const keyObj = this.languages[this.properties.lang]
        .find((key) => key.code === btnReassigned.dataset.code);
      if (this.properties.shift && this.properties.capsLock) {
        if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
          btnReassigned.childNodes[0].textContent = keyObj.small;
          btnReassigned.childNodes[1].textContent = keyObj.shift;
        } else if (keyObj.shift) {
          btnReassigned.childNodes[0].textContent = '';
          btnReassigned.childNodes[1].textContent = keyObj.small;
        }
      } else if (this.properties.shift || this.properties.capsLock) {
        if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
          btnReassigned.childNodes[0].textContent = keyObj.small;
          btnReassigned.childNodes[1].textContent = keyObj.shift;
        } else if (keyObj.shift) {
          btnReassigned.childNodes[0].textContent = '';
          btnReassigned.childNodes[1].textContent = keyObj.small.toUpperCase();
        }
      } else if (keyObj.shift && keyObj.shift.match(/[^a-zA-Zа-яА-ЯёЁ]/)) {
        btnReassigned.childNodes[0].textContent = keyObj.shift;
        btnReassigned.childNodes[1].textContent = keyObj.small;
      } else if (keyObj.shift) {
        btnReassigned.childNodes[0].textContent = '';
        btnReassigned.childNodes[1].textContent = keyObj.small;
      }
    });
  },

  arrowLeft() {
    const cursorPos = this.field.selectionStart;
    const newCursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
    this.field.setSelectionRange(newCursorPos, newCursorPos);
  },

  arrowRight() {
    const cursorPos = this.field.selectionStart;
    const newCursorPos = cursorPos + 1;
    this.field.setSelectionRange(newCursorPos, newCursorPos);
  },

  toggleSound() {
    this.properties.sound = !this.properties.sound;
  },

  soundPlay(sound) {
    sound.play();
  },

  toggleRecognizeSpeech() {
    this.properties.microphone = !this.properties.microphone;
    if (this.properties.microphone) {
      this.elements.recognition.interimResults = true;
      this.elements.recognition.lang = this.properties.lang;
      this.elements.recognition.start();
      this.elements.recognition.addEventListener('end', this.elements.recognition.start);
    } else {
      this.elements.recognition.removeEventListener('end', this.elements.recognition.start);
      this.elements.recognition.stop();
    }
  },

  open(field, initialValue, oninput, onclose) {
    this.field = field;
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard_hidden');
  },

  close() {
    this.properties.value = '';
    this.properties.cursorPosition = undefined;
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard_hidden');
  },
};

window.addEventListener('load', () => {
  Keyboard.init();
});

export default Keyboard;
