import styled from 'styled-components'

const TextBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  background-color: ${({theme}) => theme.colors.grey.variant500};
`

export default TextBar
