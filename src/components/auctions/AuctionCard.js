// src/components/auctions/AuctionCard.js
import React, { useContext } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${props.item.imgUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />
        <div className="card-body">
          <p className="lead display-6">
            {props.item.title}
          </p>
          <div className="d-flex justify-content-between aling-item-center">
            <h5>
              {days * 24 + hours} hr: {minutes} min: {seconds} sec
            </h5>
          </div>
          <p className="card-text">
            {props.item.desc}
          </p>
          <div className="d-flex justify-content-between align-item-center">
            <div>
              {!props.owner ? (
                <div 
                  onClick={() => props.bidAuction()} className="btn btn-outline-secondary"
                >
                  Oferta
                </div>
              ) : props.owner.email === props.item.email ? (
                <div
                  onClick={() => props.endAuction(props.itme.id)}
                  className="btn btn-outline-secondary"
                >
                  Cancelar subasta
                </div>
              ) : props.owner.email === props.item.curWinner ? (
                <p className="display-6">Ganador</p>
              ): (
                <div
                  onClick={() =>
                    props.bidAuction(props.item.id, props.item.curPrice)
                  }
                  className="btn btn-outline-secondary"
                >
                  Oferta
                </div>
              )}
            </div>
            <p className="display-6">${props.item.curPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={renderer}
    />
  );
};
