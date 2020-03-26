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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import {convertTimeToString} from '../../utils/helperFunctions';

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: !mobileScreen && '30vw',
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

export default function NewsCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth <= 576)

  useEffect(() => {
    window.addEventListener('resize', () => handleResize());
    return  () => {
        window.removeEventListener('resize', () => handleResize());
    }
  }, [])

  function handleResize() {
    setMobileScreen(window.innerWidth <= 576)
  }

  return (
    //  <div style={{display: 'flex', flexDirection: 'row'}}>
    <Card className={classes.root} style={{ height: '100%'}}>
      <p style={{color: 'rgba(0, 0, 0, 0.54)'}}>{convertTimeToString(props.newsArticle.publishedAt)}</p>
      <CardHeader
        // avatar={
        //   // <Avatar aria-label="recipe" className={classes.avatar}>
        //   //   R
        //   // </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        subheader={`${props.newsArticle.title}`}
     
      >
<p>{props.newsArticle.author}</p> 
<br></br>

      </CardHeader>
    
      <CardMedia
        className={classes.media}
        image={props.newsArticle.urlToImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.newsArticle.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <a href={props.newsArticle.url}>
      <Button size="small">Open Article</Button>
      </a>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.newsArticle.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    // </div>


  )
}



      