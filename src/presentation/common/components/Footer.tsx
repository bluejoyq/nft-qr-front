import { css } from "@emotion/react";
import { Box, Typography } from "@mui/joy";
import { pageContentStyles, pagePaddingStyles } from "../styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { AppIconButton } from "./AppButton";
import { AppLink } from "./AppLink";
import Logo from "@/presentation/assets/logo.svg?react";
import { Flex } from "./Flex";
export const Footer = () => {
  return (
    <Box
      css={css`
        background-color: #313131;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Box
        css={[
          pageContentStyles,
          pagePaddingStyles,
          css`
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 32px;
          `,
        ]}
      >
        <Box
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 16px;
            width: 100%;
          `}
        >
          <Logo
            css={css`
              width: 150px;
              height: auto;
            `}
          />
          <Flex />
          <Box
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 16px;
            `}
          >
            <AppLink to={"https://github.com/bluejoyq"}>
              <AppIconButton>
                <GitHubIcon />
              </AppIconButton>
            </AppLink>
            <AppLink to={"mailto:bluejoy32@gmail.com"}>
              <AppIconButton>
                <EmailIcon />
              </AppIconButton>
            </AppLink>
          </Box>
        </Box>
        <Box
          css={css`
            width: 100%;
            height: 2px;
            background-color: #c6c6c6;
          `}
        />
        <Typography>
          This service is provided by BlueJoy. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};
