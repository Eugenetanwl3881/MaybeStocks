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
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f03b9730518d4553b7f4cc3d62845a07"
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
            </Card>
          );
        })}
    </div>
  );
}

export default NewsPage;
