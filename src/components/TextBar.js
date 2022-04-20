import styled from 'styled-components'

const TextBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin: ${({theme}) => theme.space[1]};
  background-color: ${({theme}) => theme.colors.grey[500]};
`

export default TextBar
