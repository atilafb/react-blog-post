import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: ${({theme}) => `${theme.space[2]} ${theme.space[1]} ${theme.space[1]} ${theme.space[1]}`};
  padding: ${({theme}) => theme.space[3]};
  background-color: ${({theme}) => theme.colors.blueGrey.variant200}
`

export default Container;
