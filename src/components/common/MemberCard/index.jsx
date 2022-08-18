import React from 'react';
import { Avatar } from 'antd';
import classes from './styles.module.scss';

const MemberCard = ({ name, id, src }) => {
  return (
    <div className={classes.cardwrapper}>
      <Avatar size={160} src={src} className={classes.avatar} />
      <div className={classes.card}>
        <h3 className={classes.name}>{name}</h3>
        <h3>{id}</h3>
      </div>
    </div>
  );
};

export default MemberCard;
