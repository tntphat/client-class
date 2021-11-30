import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from '../../common';
import { Box, IconButton } from '@mui/material';
import useStyles from './CardGrade.styles';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

export const CardGrade = ({
  item,
  setList,
  list,
  idx,
  handleAddCard,
  handleUpdateCard,
  handleDltCard,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const [position, setPosition] = useState({
    x: '0',
    y: '0',
  });

  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isCreated, setIsCreated] = useState(false);
  const [isGettedFromApi, setIsGettedFromApi] = useState(false);
  const ref = useRef(null);
  const refPosition = useRef(null);
  const refIndex = useRef(idx);
  const [currIdx, setCurrIdx] = useState(idx);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchend', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    setPosition({ x: ref.current?.offsetLeft, y: ref.current?.offsetTop });
    refPosition.current = { x: ref.current?.offsetLeft, y: ref.current?.offsetTop };
  }, []);

  useEffect(() => {
    if (!isGettedFromApi && item.title) {
      setValue('gradePercentage', item.gradePercentage);
      setValue('title', item.title);
      setIsCreated(true);
      setIsGettedFromApi(true);
      setIsEditing(false);
    }
  }, [item]);

  useEffect(() => {
    refIndex.current = idx;
  }, [idx]);

  const onMouseDown = (e) => {
    if (idx === list.length - 1) return;
    setDragging(true);

    const pageX = e.pageX || e.changedTouches[0].pageX;
    const pageY = e.pageY || e.changedTouches[0].pageY;

    setRel({ x: pageX - ref.current?.offsetLeft, y: pageY - ref.current?.offsetTop });
    setPosition({ x: ref.current?.offsetLeft, y: ref.current?.offsetTop });
    e.stopPropagation();
  };

  const onMouseUp = (e) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    const pageX = e.pageX || e.changedTouches[0].pageX;
    const pageY = e.pageY || e.changedTouches[0].pageY;
    if (!dragging) return;

    const allCards = document.querySelectorAll('.card-grade');
    if (allCards.length <= 2) return;
    // allCards.pop();

    if (refIndex.current > 0 && allCards[refIndex.current - 1].offsetTop > ref.current.offsetTop) {
      const temp = list[refIndex.current - 1];
      list[refIndex.current - 1] = list[refIndex.current];
      list[refIndex.current] = temp;
      refIndex.current = refIndex.current - 1;
      setCurrIdx(refIndex.current - 1);
      setList([...list]);
    }

    if (
      refIndex.current < list.length - 2 &&
      allCards[refIndex.current + 1].offsetTop < ref.current.offsetTop
    ) {
      const arr = list;
      const temp = arr[refIndex.current + 1];
      arr[refIndex.current + 1] = arr[refIndex.current];
      arr[refIndex.current] = temp;
      refIndex.current = refIndex.current + 1;
      setCurrIdx(refIndex.current + 1);
      setList([...arr]);
    }

    setPosition({ x: pageX - rel.x, y: pageY - rel.y });
    e.stopPropagation();
    e.preventDefault();
  };

  const onDltCard = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
      setList([...list]);
    }
    handleDltCard();
  };

  const onEditCard = (data) => {
    setIsEditing(false);
    handleUpdateCard(data, idx);
  };

  const onAddCard = (data) => {
    setIsEditing(false);
    setIsCreated(true);
    handleAddCard(data);
  };

  return (
    <>
      <div className="card-grade">
        <Box
          className={classes.root}
          ref={ref}
          onTouchStart={onMouseDown}
          onMouseDown={onMouseDown}
          sx={{ boxShadow: 5 }}
          style={{
            left: dragging ? position.x : 0,
            top: dragging ? position.y : 0,
            position: dragging ? 'absolute' : 'relative',
            zIndex: dragging ? 2 : 1,
            // left: position.x,
            // top: position.y,
            // position: 'absolute',
          }}
        >
          <form className={classes.form} onSubmit={handleSubmit(onEditCard)}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InputText
                disabled={!isEditing}
                className={`${classes.input} ${!isEditing ? classes.inputDisabled : ''}`}
                outlinedLabel="Grade Title"
                error={errors.title}
                // label="Title"
                name="title"
                register={register}
                rules={{ required: true }}
                errMsgRow
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InputText
                outlinedLabel="Grade Percentage"
                disabled={!isEditing}
                className={`${classes.input} ${!isEditing ? classes.inputDisabled : ''}`}
                error={errors.gradePercentage}
                // label="Title"
                name="gradePercentage"
                type="number"
                register={register}
                errMsgRow
                rules={{
                  required: true,
                  validate: (value) =>
                    (Number.isInteger(+value) && +value > 0) ||
                    'Please fill in a positive interger',
                }}
                inputProps={{ step: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </form>
          {/* {item} */}
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center',
              cursor: 'pointer',
              backgroundColor: '#1dd1a1',
            }}
            onMouseDown={!isCreated ? handleSubmit(onAddCard) : () => {}}
          >
            {!isCreated ? (
              <AddCircleRoundedIcon style={{ color: 'white' }} />
            ) : (
              <>
                <Box
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    height: '50%',
                    backgroundColor: '#1e90ff',
                  }}
                  onMouseDown={isEditing ? handleSubmit(onEditCard) : () => setIsEditing(true)}
                >
                  {isEditing ? <SaveIcon /> : <EditIcon style={{ color: 'white' }} />}
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    height: '50%',
                    backgroundColor: '#ff4757',
                  }}
                  onMouseDown={onDltCard}
                >
                  <ClearIcon style={{ color: 'white' }} />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </div>

      {dragging ? (
        <div
          className={classes.root}
          style={{ width: '100%', height: '120px', backgroundColor: 'transparent' }}
        />
      ) : null}
    </>
  );
};
