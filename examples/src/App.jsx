/*
 * @Author: DM
 * @Date: 2021-12-29 18:22:39
 * @LastEditors: DM
 * @LastEditTime: 2022-01-04 14:16:15
 * @Descriptions:
 * @FilePath: /lich/examples/src/App.jsx
 */
const data = 'hello lich from vite~'

function Title(props) {
  const {className, text} = props;
  return <h1 class={className} onClick={(e)=> console.log(e,'hello lich')}>{text}</h1>
}

const node = (
  <div>
    <Title className={{a: true, b: false}} text={data} />
  </div>
);

export default node;
