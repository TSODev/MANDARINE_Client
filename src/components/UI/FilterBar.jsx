import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import Chip from '@material-ui/core/Chip'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
//    marginLeft: theme.spacing(1),
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: 60,
    width: '100%',
    backgroundColor: theme.palette.background.secondary,
    color: theme.palette.default.white,
    borderRadius: theme.spacing(1),
//    flex: 1,
  },
  iconButton: {
    padding: theme.spacing(1),
  },
  chip: {
    // display: 'flex',
    // justifyContent: 'center',
    width: 100,
    margin: theme.spacing(0.5),
  },
}));

const FilterBar= (props) =>  {
  const classes = useStyles();



  const [chipList, setchipList] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('[FILTERBAR] - useEffect : ', chipList);
    props.onFilterChange(chipList)
    return () => {
      //cleanup
    };
  }, [chipList])


  const onFilterSetClickHandler = () => {
    if (filter !== ''){
      setchipList(chipList.concat({ content: filter}));
      setFilter('');
    }
  }

  const onFilterChangeHandler = (filter) => {
    setFilter(filter);
  }

  const onChipDeleteHandler = (chip) => {
    console.log('Remove Chip : ', chip);
    setchipList(chipList.filter(c => c.content !== chip.content ))
  }

  const keyPress = (event) => {
    if(event.keyCode == 13){
      event.preventDefault();
       onFilterSetClickHandler(event.target.value)
    }
 }

  const FilterChips = () => {
    if (chipList.length !== 0) {
      return (
        <React.Fragment>
        {
          chipList.map((chip, index) => {
            return (
              <Chip
              key= {index}
              className={classes.chip}
              label={chip.content}
              onDelete={() => onChipDeleteHandler(chip)}
              color="secondary"
            />
            )
            })
        }
      </React.Fragment>
    )

    } else {
      return (
        <React.Fragment />
      )
    }

  }

  return (
    <React.Fragment>
    {/* <Paper component="form" className={classes.root}> */}
      <FilterChips />
      <InputBase
        className={classes.input}
        placeholder="Filter"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(event) => onFilterChangeHandler(event.target.value)}
        onKeyDown={keyPress}
        value={filter}
        autoFocus
      />
      {/* <IconButton 
        type="button" 
        className={classes.iconButton} 
        aria-label="search"
        onClick={onFilterSetClickHandler}
        >
        <FilterListIcon />
      </IconButton> */}
    {/* </Paper>       */}
    </React.Fragment>

  );
}

export default FilterBar;