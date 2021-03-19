import { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import { formatMessage } from 'umi/locale';
import styles from './index.less';
import imgUrl from '@/assets/qrcode_for_wechat.jpg';

const FormItem = Form.Item;
@connect(({ login }) => ({ isError: login.isError }))
class Login extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { form, onSubmit } = this.props;
    form.validateFields({ force: true }, (errors, values) => {
      onSubmit(errors, values);
    });
  };
  handleChange = () => {
    if (this.props.isError === true) {
      this.props.dispatch({
        type: 'login/save',
        payload: {
          isError: false,
        },
      });
    }
  };
  componentDidMount() {
    // this.qrcodeClick();
  }
  render() {
    const { loading, form, isError } = this.props;
    const { getFieldDecorator: fd } = form;
    const error = isError
      ? {
          validateStatus: 'error',
          help: '用户名或密码错误',
        }
      : {};
    return (
      <div className={styles.login_form}>
        {/* <LoginQrcode onClick={this.qrcodeClick} /> */}
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...error}>
            {fd('username', {
              initialValue: 'admin',
              rules: [
                {
                  required: true,
                  message: 'please enter username!',
                },
              ],
            })(
              <Input
                prefix={<Icon type="user" className={styles.color} />}
                onChange={this.handleChange}
                placeholder={formatMessage({ id: 'login.userName' })}
              />,
            )}
          </FormItem>
          <FormItem {...error}>
            {fd('password', {
              initialValue: '',
              rules: [{ required: true, message: 'plz enter password!' }],
            })(
              <Input
                prefix={<Icon type="lock" className={styles.color} />}
                type="password"
                onChange={this.handleChange}
                placeholder={formatMessage({ id: 'login.password' })}
              />,
            )}
          </FormItem>
          <FormItem>
            {fd('rememberMe', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>{formatMessage({ id: 'login.remember-me' })}</Checkbox>)}
            <a className={styles.login_form_forgot} href="/">
              {formatMessage({ id: 'login.forgot-password' })}
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.login_form_button}
              loading={loading}
            >
              {formatMessage({ id: 'login.login' })}
            </Button>
            <a href="/#register"> {formatMessage({ id: 'login.signup' })}!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
