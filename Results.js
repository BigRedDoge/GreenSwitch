import React from 'react'
import { TableWrapper } from 'react-likert'

const scale = [
  'Strongly Disagree',
  'Disagree',
  'Undecided',
  'Agree',
  'Strongly Agree',
]

const data = [
  {
    prompt: 'Likerts are useful', 
    responded: 35,
    'Strongly Disagree': 0.3, 
    'Disagree': 0.25, 
    'Undecided': 0, 
    'Agree': 0.22, 
    'Strongly Agree': 0.23 
  },
  { 
    prompt: 'D3 is still a viable choice in React projects',
    responded: 38,
    'Strongly Disagree': 0.1, 
    'Disagree': 0.22, 
    'Undecided': 0.05, 
    'Agree': 0.45, 
    'Strongly Agree': 0.18 
    },
  // etc
]

const Results = props => (
  <div>
    <TableWrapper scale={scale}>
      {
        CellRenderer => 
            {
            data.map(({ prompt, responded, ...values }, i) => 
                <Text key={i}>
                <td>{prompt}</td>
                <td>{responded}</td>
                <CellRenderer value={values} />
            )}
      }
    </TableWrapper>
  </div>
)

export default Results