import * as React from "react";
import Select from "react-select";
import styled from "styled-components";
import {userBodyId} from "../../App/context";
import {Component as ComponentModel, Style, Theme} from "../../models";
import {margins, paddings} from "../../styles";
import Component from "../Component";

const Container = styled.div`
  padding: ${paddings.large} ${paddings.none};
`;

const StyledTitleContainer = styled.div`
  display: flex;
`;

const selectHeight = "38px";
const StyledTitle = styled.div`
  font-size: ${props => props.theme.fontSizes.title};
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  line-height: ${selectHeight};
`;

const StyledSelect = styled(Select)`
font-size: ${props => props.theme.fontSizes.normal}
color: ${props => props.theme.colors.bg}
width: 150px;
margin-left: ${margins.large}
`;

interface Option {
  value: number;
  label: string;
  theme: Theme;
}

export interface Props {
  component: ComponentModel;
  themes: {[name: string]: Theme};
  styles: Style[];
  selectedThemeKey: string | null;
  setSelectedTheme: (selectedTheme: string) => any;
}

export const ComponentContainer = ({
  component,
  themes,
  styles,
  selectedThemeKey,
  setSelectedTheme,
}: Props) => {
  const options: Option[] = Object.values(themes).map((theme, idx) => {
    return {value: idx, label: theme.name, theme};
  });

  const selectedTheme =
    selectedThemeKey != null && themes[selectedThemeKey] != null
      ? themes[selectedThemeKey]
      : Object.values(themes).length !== 0
      ? Object.values(themes)[0]
      : null;

  const selectedOption =
    selectedTheme && options.filter(o => o.label === selectedTheme.name);

  const allStyles = styles
    .map(x => x.style.replace(/\bbody\b/, `#${userBodyId}`))
    .join("\n");

  return (
    <Container key={component.name}>
      <StyledTitleContainer>
        <StyledTitle>{component.name}</StyledTitle>
        {Object.values(themes).length > 0 && (
          <StyledSelect
            defaultValue={selectedOption}
            onChange={(selected: Option) =>
              setSelectedTheme(selected.theme.name)
            }
            options={options}
          />
        )}
      </StyledTitleContainer>
      <Component
        component={component}
        userTheme={selectedTheme}
        allStyles={allStyles}
      />
    </Container>
  );
};
