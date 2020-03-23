import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { act } from 'react-dom/test-utils';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function NewsCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [newsArticles, setNewsArticles] = useState([])
  const [activeIndex, setActiveIndex] = useState([])
  const refresh = (60000 * 30)
  useEffect(() => {
  
    getNews()
    setInterval(getNews, refresh);
    },[])

 const getNews = async () => {

    var url = 'http://newsapi.org/v2/top-headlines?' +
          'q=corona&covid' +
          'from=2020-03-20&' +
          'sortBy=popularity&' +
          'country=us&' +
          'apiKey=b3db4dbc41ff429ca7d575d12e817330';
          var req = new Request(url);
        const res = await fetch(req)
         const json = await res.json()
         console.log(json.articles)
        setNewsArticles(json.articles)
       console.log('fetched')
  }

 const convertUTCDateToLocalDate = (date) => {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}


  const handleExpandClick = (index) => {
      console.log(index)
      let tmparray = []
      tmparray.push(index)
      let last = tmparray.pop()
      if (last === index){
        setExpanded(!expanded)
      }
      if (activeIndex){
      setActiveIndex(...activeIndex, tmparray)
      } else {
          setActiveIndex(tmparray)
      }
      console.log(activeIndex)
     
  };

  return (
      <div style={{display: 'flex', overflow: 'scroll', width: '100%', height: '100%'}}>
    {newsArticles && newsArticles.map((newsArticle, index) => {
        return(
     <div style={{display: 'flex', flexDirection: 'row'}}>
    <Card className={classes.root} key={index} style={{width: '18vw', height: '100%'}}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={newsArticle.title}
        subheader={newsArticle.publishedAt}
        subheader={newsArticle.author}

      />
      <CardMedia
        className={classes.media}
        image={newsArticle.urlToImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {newsArticle.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <a href={newsArticle.url}>
      <Button size="small">Open Article</Button>
      </a>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => handleExpandClick(index)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{newsArticle.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
        )
        }
    )}
    </div>

  )
}




{/*     
        // <div >
        
        //     <div id='news-article' style={{width: '20vw', padding: '2vw'}} >
        //     <div style={{display: 'flex', flexDirection: 'row'}}>
        //         <img src= height='100px' width='100px' />
        //         <p style={{paddingLeft: '1vw'}}></p>
        //     </div>
        //     <p></p>
        //     <p></p>
        //     <p></p>
        //     </div>
        //     </a>
        // </div>
        */}
      