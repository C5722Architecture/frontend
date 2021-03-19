import React, { PureComponent } from "react"
import { Card, Row, Col, List, Avatar, Form, Input, Icon, Button } from 'antd';
import { connect } from 'dva'
import moment from 'moment';
import { Bar } from '@components/Echarts';
import { formatMessage } from 'umi/locale';
import MacroCommand from './manager';
import HandleSubmit from './handle';
import styles from './table.less'



const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
@connect(({ bmi, loading }) => {
    return {
        loading: loading.models.bmi,
        bmiList:bmi.bmiList,
        current_BMI:bmi.current_BMI,
    }
})



class Content extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit ={
          execute:()=>{
            const { form } = this.props;
            form.validateFields({ force: true }, (errors, values) => {
                if (!errors){
                    this.props.dispatch({
                        type: 'bmi/getBmi',
                        payload: {
                          ...values,
                        },
                      });
                }
              });
          }
        }
        this.addCurrentBMI = {
          execute:()=>{
            const {bmiList,current_BMI}=this.props;
            bmiList.push(current_BMI)
            this.props.dispatch({
              type: 'bmi/save',
              payload: {
                bmiList:bmiList,
                current_BMI:{},
              },
            });
        }
        }
        this.deleteCurrentBMI = {
          execute:()=>{
            this.props.dispatch({
              type: 'bmi/save',
              payload: {
                current_BMI:{},
              },
            });
          }
        }
        this.macroCommand = new MacroCommand();
      }
      renderCardList = (bmi)=>{
          const card =[]
         bmi.map(item=>{
            card.unshift (
                <Col span={8}>
                <Card title="BMI" 
                bordered={false} 
                className={styles.card} 
                key={item.id}
                actions={[
                  <Icon type="delete" key="delete" onClick={()=>{this.deleteCurrentBMI().execute()}}/>,
                ]}>
                  <p>height:   {item.height}</p>
                  <p>weight:   {item.weight}</p> 
                  <p>BMI:   {item.bmi}</p> 
                </Card>
               </Col>
            )
        })
        return card
      }
      doAddCurrentBMI = ()=>{
        this.macroCommand.add(this.addCurrentBMI);
        this.macroCommand.execute();
      }

     doDeleteCurrentBMI= ()=>{
      this.macroCommand.add(this.deleteCurrentBMI);
      this.macroCommand.execute();
    }

      submitAndAdd = ()=>{

        this.macroCommand.add(this.handleSubmit);
        this.macroCommand.add(this.addCurrentBMI);
        this.macroCommand.execute();
      }
      renderBMIresult =()=>{
        const { current_BMI } = this.props;
        return(
          <Card 
          title="BMI current" 
          bordered={false} 
          className={styles.card}
          actions={[
            <Icon type="delete" key="delete" onClick={this.doDeleteCurrentBMI}/>,
            <Icon type="plus" key="plus" onClick={this.doAddCurrentBMI}/>,
          ]}>
                  <p>height:   {current_BMI.height}</p>
                  <p>weight:   {current_BMI.weight}</p> 
                  <p>BMI:   {current_BMI.bmi}</p> 
          </Card>
        )
      }
      doHandleSubmit =()=>{
        const macroCommand = new MacroCommand();
        macroCommand.add(this.handleSubmit);
        macroCommand.execute();
      }
    render() {
        // const { loading, account, received_events } = this.props;
        const { form, loading,bmiList,current_BMI } = this.props;
        const { getFieldDecorator: fd } = form;
        return (
        <React.Fragment>
          <Row gutter={16}>
      <Col  span={8}>
        <div className="gutter-box">
        <Form 
            // onSubmit={this.handleSubmit}
            {...formItemLayout}
            className = {styles.bmitable}
            >
            <FormItem label="Height">
              {fd('height', {
                rules: [
                  {
                    required: true,
                    message: 'please enter your height',
                  },
                ],
              })(
                <Input
                  onChange={this.handleChange}
                  placeholder="please enter your weight "
                />,
              )}
            </FormItem>
            <FormItem label="Weight">
              {fd('weight', {
                rules: [
                  {
                    required: true,
                    message: 'please enter your weight',
                  },
                ],
              })(
                <Input
                  onChange={this.handleChange}
                  placeholder="please enter your weight "
                />,
              )}
            </FormItem>
            <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.bmi_button}
              onClick={this.doHandleSubmit}
              loading={loading}
            >
              submit
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.bmi_button_another}
              onClick={this.submitAndAdd}
              loading={loading}
            >
              submit and add to list
            </Button>
          </FormItem>
            </Form>
        </div>
      </Col>
      <Col  span={4}>
        <div className="gutter-box">
        </div>
      </Col>
      <Col  span={12}>
        <div className="gutter-box">
        <div>
            {Object.keys(current_BMI).length>0?
            this.renderBMIresult():null
            }
            </div>
        </div>
      </Col>
    </Row>
            
            <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              {bmiList&&bmiList.length>0?this.renderCardList(bmiList):'NO DATA'}
            </Row>
          </div>
          </React.Fragment> 
        );
    }
}

export default Form.create()(Content);