import { Box, Button } from "@mui/joy";
import { ReactElement } from "react";
import { pageContentStyles, pagePaddingStyles } from "../styles";
import Logo from "@/presentation/assets/logo.svg?react";
import { css } from "@emotion/react";
import { Flex } from "./Flex";
import { Link } from "react-router-dom";
import { HOME_PATH } from "@/domain/paths";
export const Header = (): ReactElement => {
  return (
    <Box css={[pageContentStyles, pagePaddingStyles, styles.header]}>
      <Link to={HOME_PATH}>
        <Logo css={styles.logo} />
      </Link>
      <Flex />
      <Button variant="plain" css={styles.menu}>
        About
      </Button>
    </Box>
  );
};

const styles = {
  header: css`
    flex-direction: row;
    align-items: center;
    height: 80px;
  `,
  logo: css`
    color: #fff;
    width: 200px;
    aspect-ratio: 50/12;
    height: auto;
  `,
  menu: css`
    border-radius: 8px;
    font-weight: 500;
    font-size: 20px;
  `,
};
