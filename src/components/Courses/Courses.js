import React from 'react';
import './Courses.scss';
class Courses extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(val) {
      // console.log('Se hizo click', val);
      let data = [99,86,87,88,111,86,103,87,94,78,77,85,86]
      
      const sorted = data.sort((a, b) => {return a - b})

      let mean = 0
      let median = 0
      let mode = 0

      let mf = 1;
      let m = 0;


      const sizeData = data.length
      const is_odd = sizeData%2 ? true: false       
       for (let i in data) {
         mean += data[i]

         if(is_odd){
          median = sorted[Math.floor(sizeData/2)]
         }else {
           median = (sorted[Math.floor(sizeData/2)] + sorted[Math.floor(sizeData/2) + 1])/ 2
         }
         for (let j in data)
         {
                 if (data[i] === data[j])
                  m++;
                 if (mf<m)
                 {
                   mf=m; 
                   mode = data[i];
                 }
         }
         m=0;

       }
       console.log("La media es "+ mean/sizeData)
       console.log("La mediana es "+ median)
       console.log("La moda es "+ mode)

    }
  render() {
    return (
      <div className="course"  value={this.props.course._id} onClick={() => this.handleClick(this.props.course._id)}>
          <img src={`${this.props.course.img ?this.props.course.img : 'https://cdn.codecademy.com/assets/components/cards/path-card/5d8a2f26510e9000118ef3b8.svg'}`} alt="_blank"></img>
          <div className="courseContent">
            <div> {`${this.props.course.title}`} </div>
            <div> {`${this.props.course.content}`} </div>
          </div>
          <div className="duration"> {`${this.props.course.duration_value} ${this.props.course.duration_text}`} </div>
      </div>
      
    );
  }
}

export default Courses;