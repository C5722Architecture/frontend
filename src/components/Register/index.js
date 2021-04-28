import { Component } from 'react';
import { Link } from 'umi';
import { formatMessage } from 'umi/locale';
import { Form, Input, Button, Select, Row, Col, Popover, Progress, DatePicker  } from 'antd';
import moment from 'moment';
import Birth from './birth'
import styles from "./index.less";

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const dateFormat = 'DD/MM/YYYY';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            confirmDirty: false,
            visible: false,
            help: '',
            prefix: '86',
            getPasswordStatus: this.getPasswordStatus.bind(this)
        };
        this.age={
            reset:()=>{
                this.props.form.setFieldsValue({
                    birth: '',
                    age:'',
                  });
            },
            change:(birthday)=>{
                const text = moment(birthday, 'YYYY-MM-DD').fromNow();  
                let age = text.split(' ')[0]  
                if (isNaN(age)) {    
                    age = 'unknown'; 
                } 
                this.props.form.setFieldsValue({
                    age: age,
                  });
            }
        }
        this.birth=new Birth(this.age)

    }

    getPasswordStatus = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    };
    renderPasswordProgress = (passwordProgressMap) => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        const passwordStatus = this.getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };
    disabledDate=(current)=> {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
      }
      doChangeAge=(birthday)=>{
          this.birth.change(birthday)
      }
      doResetAge=(birthday)=>{
        this.birth.reset()
    }

    render() {
        const { form, submitting } = this.props;
        const {
            // validateFields,
            getFieldDecorator: fd,
        } = form;
        const { count, prefix, help, visible } = this.state;

        const passwordStatusMap = {
            ok: <div className={styles.success}>{formatMessage({ id: 'validation.password.strength.strong' })}</div>,
            pass: <div className={styles.warning}>{formatMessage({ id: 'validation.password.strength.medium' })}</div>,
            poor: <div className={styles.error}>{formatMessage({ id: 'validation.password.strength.short' })}</div>,
        };
        const passwordProgressMap = {
            ok: 'success',
            pass: 'normal',
            poor: 'exception',
        };
        return (
            <div className={styles.register_form}>
                <Form>
                <FormItem>
                        {fd('first_name', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'validation.email.required' }),
                                },
                            ],
                        })(<Input size="large" placeholder={formatMessage({ id: 'form.fn.placeholder' })} />)}
                    </FormItem>
                    <FormItem>
                        {fd('last_name', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'validation.ln.required' }),
                                },
                        
                            ],
                        })(<Input size="large" placeholder={formatMessage({ id: 'form.ln.placeholder' })} />)}
                    </FormItem>
                    <FormItem>
                        {fd('email', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'validation.email.required' }),
                                },
                                {
                                    type: 'email',
                                    message: formatMessage({ id: 'validation.email.wrong-format' })
                                },
                            ],
                        })(<Input size="large" placeholder={formatMessage({ id: 'form.email.placeholder' })} />)}
                    </FormItem>
                    <FormItem help={help}>
                        <Popover
                            content={
                                <div style={{ padding: '4px 0' }}>
                                    {passwordStatusMap[this.getPasswordStatus()]}
                                    {this.renderPasswordProgress(passwordProgressMap)}
                                    <div style={{ marginTop: 10 }}>
                                        {formatMessage({ id: 'validation.password.strength.msg' })}
                                    </div>
                                </div>
                            }
                            overlayStyle={{ width: 240 }}
                            placement="right"
                            visible={visible}
                        >
                            {fd('password', {
                                rules: [
                                    {
                                        validator: this.checkPassword,
                                    },
                                ],
                            })(<Input size="large" type="password" placeholder={formatMessage({ id: 'form.password.placeholder' })} />)}
                        </Popover>
                    </FormItem>
                    <FormItem>
                        {fd('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'validation.password.required' })
                                },
                                {
                                    validator: this.checkConfirm,
                                },
                            ],
                        })(<Input size="large" type="password" placeholder={formatMessage({ id: 'form.confirm-password.placeholder' })} />)}
                    </FormItem>
                    <FormItem>
                        {fd('date_of_birth', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'validation.birth.required' })
                                },
                            ],
                        })(<DatePicker 
                        showTime size="large" 
                        style={{ width: '100%' }} 
                        format={dateFormat} 
                        placeholder={formatMessage({ id: 'form.birth.placeholder' })}
                        disabledDate={this.disabledDate}
                        onChange={this.doChangeAge}/>)}
                    </FormItem>
                    <FormItem>
                        {fd('age', {
                        })(<Input size="large" 
                        style={{ width: '50%' }}
                        disabled
                        placeholder={formatMessage({ id: 'form.age.placeholder' })} />)}
                        <Button 
                        style={{marginLeft:'120px'}}
                        onClick={this.doResetAge}>reset</Button>
                    </FormItem>
                    <FormItem>
                        <InputGroup compact>
                            <Select
                                size="large"
                                value={prefix}
                                onChange={this.changePrefix}
                                style={{ width: '25%' }}
                            >
                                <Option value="86">+86</Option>
                                <Option value="353">+353</Option>
                            </Select>
                            {fd('mobile', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'validation.phone-number.required' }),
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                                    },
                                ],
                            })(<Input size="large" style={{ width: '75%' }} placeholder={formatMessage({ id: 'form.phone-number.placeholder' })} />)}
                        </InputGroup>
                    </FormItem>
                    <FormItem>
                        {fd('address', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'validation.address.required' }),
                                },
                            ],
                        })(<Input size="large" placeholder={formatMessage({ id: 'form.address.placeholder' })} />)}
                    </FormItem>
                    {/* <FormItem>
                        {fd('health', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({ id: 'validation.health.required' }),
                                },
                            ],
                        })(<Select
                            style={{ width: '100%' }}
                            placeholder={formatMessage({ id: 'form.health.placeholder' })}
                          >
                            <Option value="good">good</Option>
                            <Option value="fine">fine</Option>
                            <Option value="bad">bad</Option>
                          </Select>,)}
                    </FormItem> */}
                    {/* <FormItem>
                        <Row gutter={8}>
                            <Col span={16}>
                                {fd('captcha', {
                                    rules: [
                                        {
                                            required: true,
                                            message: formatMessage({ id: 'validation.verification-code.required' }),
                                        },
                                    ],
                                })(<Input size="large" placeholder={formatMessage({ id: 'form.verification-code.placeholder' })} />)}
                            </Col>
                            <Col span={8}>
                                <Button
                                    size="large"
                                    disabled={count}
                                    className={styles.getCaptcha}
                                    onClick={this.onGetCaptcha}
                                >
                                    {count ? `${count} s` : formatMessage({ id: 'register.get-verification-code' })}
                                </Button>
                            </Col>
                        </Row>
                    </FormItem> */}
                    <FormItem>
                        <Button
                            size="large"
                            loading={submitting}
                            className={styles.submit}
                            type="primary"
                            htmlType="submit"
                        >
                            {formatMessage({ id: 'register.register' })}
                        </Button>
                        <Link className={styles.login} to="/login">
                            {formatMessage({ id: 'register.sign-in' })}
                        </Link>
                    </FormItem>
                </Form>
            </div>

        );
    }
}

export default Form.create()(Register);