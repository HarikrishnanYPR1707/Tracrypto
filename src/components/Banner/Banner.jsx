import { css } from "@emotion/react";
import { Container, Typography } from "@mui/material";
import React from "react";

const Banner = () => {
  return (
    // Banner Section
    <div
      style={{
        backgroundImage: "url(./banner2.jpg)",
      }}
    >
      {/* Banner Content  */}
      <Container
        style={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          justifyContent: "space-around",
        }}
      >
        {/* Banner Taglines  */}
        <div
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            style={{
              fontWeight: "Bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
            variant="h2"
          >
            Tracrypto
          </Typography>
          <Typography
            style={{
              color: "darkgray",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
            variant="subtitle2"
          >
            Get all the Info regarding favorite Crypto Currency
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
