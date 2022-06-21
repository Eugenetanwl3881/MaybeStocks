import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// import {Card, Button} from "antd"
// const { Meta } = Card;

function NewsPage() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?q=Apple&from=2022-06-20&sortBy=popularity&apiKey=3da128da75bb4e819bb876090635ca8f"
      );
      setNews(response.data.articles);
    };
    loadNews();
  }, []);

  console.log("news", news);

  return (
    <div>
      {news &&
        news.map((item, index) => {
          return (
            <Card sx={{ maxWidth: 500 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.urlToImage}
                alt="image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
              </CardContent>
              <CardActions>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <Button size="small">Read More</Button>
                </a>
              </CardActions>
              {/* 
            <Card
              key={index}
              hoverable
              style={{ width: "50%" }}
              cover={<img alt="image" src={item.urlToImage} width = {null} height = {400} flex={1} />}
            >
              <Meta title={item.title} description={item.content} />
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button type="primary" style={{ marginTop: "10px" }}>
                  Read More
                </Button>
              </a> */}
            </Card>
          );
        })}
    </div>
  );
}

export default NewsPage;
