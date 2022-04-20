import styled from 'styled-components'

const Card = styled.div`
  flex: 1;
  padding: ${({theme}) => theme.space[3]};
  margin: auto;
  width: 95%;
  border: solid 1px ${({theme}) => theme.colors.black};
  border-radius: ${({theme}) => theme.radii[2]};
  box-shadow: ${({theme}) => `${theme.space[2]} ${theme.space[1]} ${theme.space[1]} ${theme.colors.black}`};
  background-color: ${({theme}) => theme.colors.blueGrey.variant50};
`

export default Card;
