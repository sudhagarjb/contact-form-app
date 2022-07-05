<template>
  <div class="container">
    <div>
      <h1>{{ title }}</h1>
    </div>
    <form>
      <div class="row">
        <div class="col">
          <div class="form-field">
            <div class="form-field-control">
              <input
                id="name"
                type="text"
                class="form-field-input"
                placeholder=" "
                v-model.trim="form.name"
                minlength="5"
                maxlength="50"
                required
              />
              <label for="name" class="form-field-label">Name</label>
              <div class="form-field-bar"></div>
            </div>
            <span class="error" v-if="v$.form.name.$error">
              {{ v$.form.name.$errors[0].$message }}
            </span>
          </div>
        </div>
        <div class="col col">
          <div class="form-field">
            <div class="form-field-control">
              <input
                id="email"
                type="email"
                class="form-field-input"
                placeholder=" "
                v-model.trim="form.email"
                required
              />
              <label for="email" class="form-field-label">Email</label>
              <div class="form-field-bar"></div>
            </div>
            <span class="error" v-if="v$.form.email.$error">
              {{ v$.form.email.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-field">
            <div class="form-field-control">
              <input
                id="subject"
                type="text"
                class="form-field-input"
                placeholder=" "
                v-model.trim="form.subject"
                maxlength="100"
              />
              <label for="subject" class="form-field-label">Subject</label>
              <div class="form-field-bar"></div>
            </div>
            <span class="error" v-if="v$.form.subject.$error">
              {{ v$.form.subject.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-field">
            <div class="form-field-control">
              <textarea
                id="text_box"
                class="form-field-textarea"
                placeholder=" "
                maxlength="500"
                v-model.trim="form.message"
              ></textarea>
              <label for="text_box" class="form-field-label">Message</label>
              <div class="form-field-bar"></div>
            </div>
            <span class="error" v-if="v$.form.message.$error">
              {{ v$.form.message.$errors[0].$message }}
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <button
          class="btn col"
          :disabled="v$.$error || isDisabled"
          @click="submitForm"
        >
          Submit
        </button>
      </div>
    </form>
    <section ref="toast">
      <span class="toast-span">{{ toast }}</span>
    </section>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core';
import '../assets/style.scss';

import {
  helpers,
  required,
  email,
  minLength,
  maxLength,
} from '@vuelidate/validators';
import { postMessage } from '../services/postMessage';
import { constants } from '../services/constant';

const isValidSubject = (value) => value.length <= constants.maxSubjectLength;

export default {
  name: "ContactForm",
  props: {
    title: String,
  },
  data() {
    return {
      v$: useValidate(),
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      isDisabled: false,
      toast: "",
    };
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage("Name is required", required),
          minLength: helpers.withMessage(
            "Name should be at least 5 characters long",
            minLength(constants.minNameLength)
          ),
          maxLength: helpers.withMessage(
            "The maximum length allowed for Name is 50",
            maxLength(constants.maxNameLength)
          ),
        },
        email: {
          required: helpers.withMessage("Email is required", required),
          email: helpers.withMessage("Should be a valid Email", email),
        },
        subject: {
          isValidSubject: helpers.withMessage(
            "Subject should be less than 100 characters",
            isValidSubject
          ),
        },
        message: {
          required: helpers.withMessage("Messsage is required", required),
          maxLength: helpers.withMessage(
            "The maximum length allowed for message is 500",
            maxLength(constants.maxMessageLength)
          ),
        },
      },
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      this.isDisabled = true;
      if (!this.v$.$error) {
        this.isDisabled = true;
        var params = this.constructData();
        this.postContent(params);
      } else {
        this.isDisabled = false;
      }
    },

    constructData() {
      var apiParams = new Object();
      apiParams = this.form;
      return apiParams;
    },

    postContent(params) {
      postMessage(params)
        .then((response) => {
          console.log(response.data);
          this.form = {};
          this.$nextTick(() => {
            this.v$.$reset();
          });
          this.isDisabled = false;
        })
        .catch((error) => {
          this.displayToast(error.message);
          this.isDisabled = false;
        });
    },

    displayToast(message) {
      var toastRef = this.$refs.toast;
      this.toast = message;
      toastRef.className = "show";
      setTimeout(function () {
        toastRef.className = this.toast = "";
      }, 3000);
    },
  },
};
</script>

