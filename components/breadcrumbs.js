import { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import HeaderLink from "./header_link";

const greyBanner = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  margin: 15px 0;
  font-weight: 700;
  color: ${globalTheme.colour.greyishBrown};
  font-size: 16px;
  background-color: ${globalTheme.colour.paleGreyTwo};
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    margin: 11px 0;
  }
  padding-top: 10px;
  padding-bottom: 10px;
`;

const separator = css`
  color: ${globalTheme.colour.navy};
  font-weight: normal;
  padding: 7px;
`;

const urlStyle = css`
  color: ${globalTheme.colour.navy};
  text-decoration: underline;
  font-size: 16px;
  font-weight: 700;
  padding: 0;
`;

const currentPageStyle = css`
  color: ${globalTheme.colour.navy};
  font-size: 16px;
  font-weight: 700;
  padding: 0;
`;

export class BreadCrumbs extends Component {
  render() {
    const { breadcrumbs, t } = this.props;
    return (
      <div css={greyBanner}>
        <div>
          <HeaderLink id="homeButton" href={t("ge.home_link")} css={urlStyle}>
            {this.props.t("titles.home")}
          </HeaderLink>
          {breadcrumbs.map((breadcrumb, i) => (
            <span key={"breadcrumb" + i}>
              <span css={separator}>{" > "}</span>
              <HeaderLink
                id={"breadcrumb" + i}
                href={breadcrumb.url}
                css={urlStyle}
              >
                {breadcrumb.name}
              </HeaderLink>
            </span>
          ))}
          <span css={separator}>{" > "}</span>
          <span css={currentPageStyle}>{this.props.pageTitle}</span>
        </div>
      </div>
    );
  }
}

BreadCrumbs.propTypes = {
  t: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired
};

export default BreadCrumbs;
