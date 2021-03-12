import styled from 'styled-components';

const Row = styled.div<{ align?: string; padding?: string; border?: string; borderRadius?: string; disabled?:boolean;selected?:boolean}>`
  width: 100%;
  display: flex;
  padding: 0;
  align-items: ${({ align }) => (align ? align : 'center')};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
`

export const RowVerticalEnd = styled(RowBetween)`
   align-items: flex-end;
   position: relative;
`

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`

export const MenuItem = styled(RowBetween)`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  //grid-template-columns: auto minmax(auto, 1fr) auto minmax(0, 72px);
  grid-template-columns: auto minmax(auto, 1fr) auto;
  grid-gap: 16px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => disabled && 'none'};
  box-sizing: border-box;
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.bg6};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

export default Row;