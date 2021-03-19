import { connect } from 'dva'

@connect(({ bmi, loading }) => {
    return {
        loading: loading.models.bmi,
        bmiList:bmi.bmiList,
        current_BMI:bmi.current_BMI,
    }
})
class HandleSubmit  {   // 命令对象
    constructor(bmi) {
        this.bmi = bmi;  
      }
    execute () {
     this.props.dispatch({
                      type: 'bmi/getBmi',
                      payload: {
                        ...this.bmi,
                      },
                    });
    }
  }

  export default HandleSubmit