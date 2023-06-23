<script setup>
</script>

<template>
  <div class="form__wrapper">
    <form action="/" method="get" id="landing-form" class="form">
      <div class="form__title">
        <span> Get <span class="mark-blue bold"> access</span></span>  
        <svg width="51" height="52" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.0678 0.665217L32.0719 13.637C32.7966 15.1891 34.1423 16.187 35.6951 16.4087L49.0492 18.5152C49.9808 18.6261 50.3949 19.9565 49.6703 20.7326L40.043 30.8217C38.9042 32.0413 38.3866 33.7043 38.6972 35.3674L40.9746 49.5587C41.1817 50.5565 40.1465 51.3326 39.2148 50.8891L27.31 44.1261C25.9643 43.35 24.308 43.35 22.8587 44.1261L10.9539 50.8891C10.1258 51.3326 9.09058 50.5565 9.1941 49.5587L11.368 35.2565C11.6786 33.5935 11.161 31.9304 10.0223 30.7109L0.394924 20.6217C-0.329713 19.9565 -0.0191544 18.6261 1.01604 18.5152L14.3701 16.4087C15.9229 16.187 17.2686 15.0783 17.9933 13.637L23.9974 0.665217C24.308 -0.221739 25.5502 -0.221739 26.0678 0.665217Z" fill="#448AFF"/>
        </svg>
      </div>
      <div class="form__text">
        Fill the form to participate in beta testing, and we will contact you soon:
      </div>
      <div class="form__success d-none">
        <svg width="67" height="48" viewBox="0 0 67 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 24L24 43L61.5 5.5" stroke="#448AFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="form__success-text">
          Thank you! <br>
          The request was sent!
        </div>
          
      </div>
      <div class="form__inputs-wrapper">
        <div class="form__inputs">
          <input id="input-name" type="text" placeholder="Name" class="form__input form__input--one">
          <input id="input-email" type="text" placeholder="Email" class="form__input form__input--two">
        </div>
        <div class="form__btns">
          <button class="form__btn">
            Send
          </button>
          <span class="form__error">! Fill the gaps</span>
        </div>
      </div>  
    </form>
  </div>
</template>

<style>
.form {
  padding: 50px 40px;
  border-radius: 15px;
  left: 50%;
  z-index: 10;
  top: -265px;
  transform: translateX(-50%);
  max-width: 580px;
  position: absolute;
  background-color: #fff;
}
.form__wrapper {
  position: relative;
}

.form__title {
  font-family: Comfortaa;
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  letter-spacing: -1px;
  text-align: left;
  display: flex;
  align-items: center;
}
.form__title > svg {
  margin-left: 15px;
}

.form__text {
  font-family: Comfortaa;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -1px;
  text-align: left;
  margin-top: 11px;
}
.form__inputs {
  display: flex;
  flex-wrap: wrap;
}
.form__input {
  width: 60%;
  padding: 20px 26px;
  border-radius: 34px;
  border: 3px solid #448AFF;
  margin-top: 16px;
}
.form__input::placeholder {
  color: #CFCFCF;
}
.form__error {
  opacity: 0;
  display: inline;  
  font-family: Comfortaa;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -1px;
  text-align: left;
  margin-left: 25px;
  color:#FF2372;
}

.form__input--one {}
.form__input--two {}

.form__btn {
  cursor: pointer;
  margin-top: 33px;
  background: #448AFF;
  border-radius: 34.5px;
  color: #fff;
  text-transform: uppercase;
  padding: 15px 25px;
  border: 1px solid transparent;
  font-family: Comfortaa;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -1px;
  text-align: center;
}
.form__success {
  padding-top: 80px;
  padding-bottom: 20px;
}
.form__success svg {
  display: block;
  margin: 0 auto;
}

.form__success-text {
  margin-top: 32px;
  font-family: Comfortaa;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: -1px;
  text-align: center;
}
@media (max-width: 600px) {
  .form {
    padding-bottom: 0;
  }
  .form__wrapper {
  }
  .form__title {
    font-size: 28px;
    line-height: 36px;
  }
  .form__title > svg {
  }
  .form__text {
    font-size: 16px;
    line-height: 24px;
  }
  .form__inputs {
  }
  .form__input {
    padding: 12px 20px;
    font-size: 16px;
    margin-top: 12px;
  }
  .form__input--two {
    width: 90%;
  }
  .form__error {
    font-size: 16px;
    width: 100%;
    display: block;
    margin-left: 0;
    margin-top: 10px;
  }
  .form__btn {
    margin-top: 18px;
    font-size: 16px;
    line-height: 24px;
    padding: 12px 20px;
  }
  .form__success-text {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
