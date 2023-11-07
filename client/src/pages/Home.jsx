import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PhotoMeme from "../components/PhotoMeme";
import VideoMeme from "../components/VideoMeme";
import Footer from "../components/Footer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { mobile } from "../resources/mobile";
//Main css
const Container = styled.div`
  height: auto;
  width: 100%;
  background-color: #121212;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

//CSS for Toggle function
const ToggleContainer = styled.div`
  height: auto;
  width: 100vw;
  background-color: #121212;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  position: relative;
`;

const ToggleWrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  background-color: #1d1d1d;
  border: 2px solid #373737;
  padding: 5px;
  border-radius: 25px;
`;

const GenerateButtonContainer = styled.div`
  display: flex;
  margin-right: auto;
  align-items: center;
  position: absolute;
  right: 85%;
  ${mobile({ right: "70%" })}
`;

const GenerateButton = styled.button`
  width: auto;
  height: 50px;
  background-color: #28a745;
  border: none;
  color: white;
  font-size: larger;
  ${mobile({ fontWeight: 200, fontSize: "auto" })}
  cursor: pointer;
  border-radius: 0.2rem;
  font-weight: 600;
  box-shadow: 0px 5px 5px -5px #28a745;
  transition: all ease 0.3s;
  &:hover {
    background-color: #145322;
    color: #7f7f7f;
  }
`;

const Photo = styled.div`
  padding: 7px;
  cursor: pointer;
`;

const Video = styled.div`
  padding: 7px;
  cursor: pointer;
`;

const Active = styled.div`
  background-color: #121212;
  border-radius: 15px;
  border: 1px solid #373737;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 30px;
  padding-left: 15px;
  height: 2.5rem;
  width: auto;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #373737;
  color: white;
  background-color: #121212;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #373737;
  }
  &:focus {
    outline: none;
  }
`;

const Home = () => {
  //for redirecting on generate meme page
  const navigate = useNavigate();

  //function for setting toggle Active
  const [isActive, setIsActive] = useState(true);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  //show more function where showMorePhotoValue is how many cards to be shown
  const [showMorePhotoValue, setShowMorePhotoValue] = useState(3);
  const [showMoreVideoValue, setShowMoreVideoValue] = useState(3);
  //showMoreP means showMorePhoto
  const showMoreP = () => {
    setShowMorePhotoValue((prev) => prev + 2);
  };
  //showMoreV means showMoreVideo
  const showMoreV = () => {
    setShowMoreVideoValue((pre) => pre + 2);
  };

  //Disabling show more for Photos page
  const [photoCardCount, setPhotoCardCount] = useState(1);
  const numberOfCardsP = (total) => {
    setPhotoCardCount(total);
  };

  //Disabling show more for Video page which is fetching data from child
  const [videoCardCount, setVideoCardCount] = useState(1);
  const numberOfCardsV = (total) => {
    setVideoCardCount(total);
  };

  //Search container getting value from child
  const [searchValue, setSearchValue] = useState("");
  const search = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <Container>
        <Navbar value={search} />
        <Wrapper>
          <ToggleContainer>
            <GenerateButtonContainer>
              <GenerateButton onClick={() => navigate("/generate")}>
                Generate Meme!
              </GenerateButton>
            </GenerateButtonContainer>
            <ToggleWrapper>
              {isActive ? (
                <>
                  <Active>
                    <Photo>Photo</Photo>
                  </Active>
                  <Video onClick={handleClick}>Video</Video>
                </>
              ) : (
                <>
                  <Photo onClick={handleClick}>Photo</Photo>
                  <Active>
                    <Video>Video</Video>
                  </Active>
                </>
              )}
            </ToggleWrapper>
          </ToggleContainer>
          {isActive ? (
            <PhotoMeme
              photoShowMore={showMorePhotoValue}
              count={numberOfCardsP}
              searchValue={searchValue}
            />
          ) : (
            <VideoMeme
              videoShowMore={showMoreVideoValue}
              count={numberOfCardsV}
              searchValue={searchValue}
            />
          )}
        </Wrapper>
        {isActive ? (
          <>
            {/*Show more Button for Photos Page*/}
            {photoCardCount > showMorePhotoValue ? (
              <Button onClick={isActive ? showMoreP : showMoreV}>
                Show More <ArrowDropDownIcon />
              </Button>
            ) : (
              <Button
                style={{ display: "none" }}
                onClick={isActive ? showMoreP : showMoreV}
              >
                Show More <ArrowDropDownIcon />
              </Button>
            )}
          </>
        ) : (
          <>
            {/*Show more Button for Videos Page*/}
            {videoCardCount > showMoreVideoValue ? (
              <Button onClick={isActive ? showMoreP : showMoreV}>
                Show More <ArrowDropDownIcon />
              </Button>
            ) : (
              <Button
                style={{ display: "none" }}
                onClick={isActive ? showMoreP : showMoreV}
              >
                Show More <ArrowDropDownIcon />
              </Button>
            )}
          </>
        )}
        <Footer />
      </Container>
    </>
  );
};

export default Home;
