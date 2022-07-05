import { shallowMount } from '@vue/test-utils'
import ContactForm from '@/components/ContactForm.vue'

describe('ContactForm.vue', () => {
  let wrapper;
  const title = 'new message'

  beforeEach(() => {
    wrapper = shallowMount(ContactForm, {
      props: {
        title: title
      }
    })
  })

  it('renders props.title when passed', async () => {
    expect(wrapper.text()).toContain('new message');
  }),
  it('renders any text from the component', () => {
    expect(wrapper.text()).toContain('Name');
  })
}),

describe('ContactForm.vue component check', () => {
  let wrapper = shallowMount(ContactForm);

  it('renders parent component when passed', () => {
    expect(wrapper.vm.$parent.$options.name).toBe('VTU_ROOT');
  }),
  it('renders current component when passed', () => {
    expect(wrapper.vm.$options.name).toBe('ContactForm');
  })
}),

describe('Vuelidate params check', () => {
  let wrapper = shallowMount(ContactForm);
  wrapper.vm.v$.$validate();

  it('errors in v$ are true', () => {
    expect(wrapper.vm.v$.form.name.$error.toBeTruthy);
  }),
  it('renders Vuelidate message params', () => {
    expect(wrapper.vm.v$.form.message.$errors[0].$validator).toBe('required');
  }),
  it('errors in Subject are not true', () => {
    expect(wrapper.vm.v$.form.subject.$error.toBeFalsy);
  })
}),

describe('Before Submit click -  elements check ', () => {
  let wrapper = shallowMount(ContactForm);

  it('to not have disabled property', () => {
    expect(wrapper.vm.isDisabled).toBeFalsy;
  }),
  it('renders input element', () => {
    expect(wrapper.findAll('input').length).toEqual(3);
  }),
  it('renders textarea element', () => {
    expect(wrapper.findAll('textarea')).toHaveLength(1);
  }),
  it('renders button element', () => {
    expect(wrapper.findAll('button').length).toEqual(1);
  }),
  it('renders span element', () => {
    expect(wrapper.findAll('span')).toHaveLength(1);
  }),
  it('renders form element', () => {
    expect(wrapper.findAll('form')).toHaveLength(1);
  })
}),

describe('After Submit click', () => {
  let wrapper = shallowMount(ContactForm);
  wrapper.setData({
    form: {
      name: 'abc',
      email: 'qwerty',
      subject: '',
      message: '',
    }
  });
  it('submitForm method should be called', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(typeof (wrapper.vm.submitForm)).toEqual('function');
  }),
  it('renders name validation error', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.vm.v$.form.name.$errors[0].$message).toBe('Name should be at least 5 characters long');
  }),
  it('renders email validation error', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.vm.v$.form.email.$errors[0].$message).toBe('Should be a valid Email');
  }),
  it('renders subject validation error', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.vm.v$.form.subject.$errors[0]).toBeUndefined();
  }),
  it('renders message validation error', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.vm.v$.form.message.$errors[0].$message).toBe('Messsage is required');
  })
}),

describe('Button component check', () => {
  let wrapper = shallowMount(ContactForm);
  wrapper.setData({
    form: {
      name: 'abc',
      email: 'qwerty',
      subject: '',
      message: '',
    }
  });
  it('to have disabled property', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.get('button').attributes()).toHaveProperty('disabled');
  }),
  it('to check isDisabled boolean', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.vm.isDisabled).toBeTruthy;
  })
})
