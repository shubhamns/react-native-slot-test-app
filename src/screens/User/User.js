import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const User = ({route, navigation}) => {
  const {itemId} = route.params;
  const [values, setValues] = useState({
    itemId: itemId,
    name: '',
    email: '',
    phone: '',
  });
  const {name, email, phone} = values;
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    handleValidate(values);
  }, [values]);

  const onChange = (name, value) => {
    setValues(oldValue => ({...oldValue, [name]: value}));
  };

  const onSubmit = () => {
    setSubmitted(true);
    if (handleValidate(values)) {
      navigation.navigate('Home', values);
    }
  };

  const handleValidate = values => {
    let errors = {};
    let isValid = true;
    if (!values['name']) {
      isValid = false;
      errors['name'] = 'Please enter name.';
    }
    if (typeof values['email'] !== 'undefined') {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!pattern.test(values['email'])) {
        isValid = false;
        errors['email'] = 'Please enter valid email address.';
      }
    }
    if (!values['email']) {
      isValid = false;
      errors['email'] = 'Please enter email address.';
    }
    if (typeof values['phone'] !== 'undefined') {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(values['phone'])) {
        isValid = false;
        errors['phone'] = 'Please enter valid phone number.';
      } else if (values['phone'].length != 10) {
        isValid = false;
        errors['phone'] = 'Please enter valid phone number.';
      }
    }
    if (!values['phone']) {
      isValid = false;
      errors['phone'] = 'Please enter phone number.';
    }
    setErrors(errors);
    return isValid;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => onChange('name', value)}
              value={name}
              placeholder="Enter Name"
            />
            <Text style={styles.errorStyle}>{submitted && errors.name}</Text>
          </View>
          <View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => onChange('email', value)}
              value={email}
              placeholder="Enter Email Address"
            />
            <Text style={styles.errorStyle}>{submitted && errors.email}</Text>
          </View>
          <View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={value => onChange('phone', value)}
              value={phone}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              maxLength={10}
            />
            <Text style={styles.errorStyle}>{submitted && errors.phone}</Text>
          </View>
          <TouchableOpacity style={styles.buttonStyle} onPress={onSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  inputStyle: {
    height: 40,
    borderWidth: 1,
  },
  errorStyle: {
    color: '#CA0000',
    marginBottom: 10,
  },
  buttonStyle: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default User;
