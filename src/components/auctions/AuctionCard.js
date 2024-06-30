import React, { useContext, useState } from 'react';
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/AuthContext';


const Renderer = ({ days, hours, minutes, seconds, completed, owner, item, bidAuction, endAuction, increaseBid, incrementAmount, handleIncrementChange }) => {
  if (completed) {
    return null;
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: '320px',
            backgroundImage: `url(${item.itemImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
          className="w-100"
        />
        <div className="card-body">
          <p className="lead display-6">
            {item.title}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <h5>
              {days > 0 ? `${days} día${days > 1 ? 's' : ''}, ` : ''}
              {hours} hr: {minutes} min: {seconds} sec
            </h5>
          </div>
          <p className="card-text">
            {item.desc}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!owner ? (
                <div
                  onClick={() => bidAuction(item.id, item.curPrice)}
                  className="btn btn-outline-secondary"
                >
                  Oferta
                </div>
              ) : owner.email === item.email ? (
                <div
                  onClick={() => endAuction(item.id)}
                  className="btn btn-outline-secondary"
                >
                  Cancelar subasta
                </div>
              ) : owner.email === item.curWinner ? (
                <div className="d-flex align-items-center">
                  <p className="display-6 mr-2">Ganador</p>
                  
                </div>
              ) : (
                <>
                  <div
                    onClick={() => bidAuction(item.id, item.curPrice)}
                    className="btn btn-outline-secondary"
                  >
                    Oferta
                  </div>
                  <div className="input-group my-3">
                    <input
                      type="number"
                      className="form-control"
                      value={incrementAmount}
                      onChange={handleIncrementChange}
                      placeholder="Cantidad a incrementar"
                    />
                    <div
                      onClick={() => increaseBid(item.id, incrementAmount)}
                      className="btn btn-outline-secondary"
                    >
                      Incrementar oferta
                    </div>
                  </div>
                  
                </>
              )}
            </div>
            <p className="display-6">${item.curPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuctionCard = ({ item }) => {
  const [incrementAmount, setIncrementAmount] = useState(item.curPrice);
  const { currentUser, bidAuction, endAuction, increaseBid } = useContext(AuthContext);

  const handleIncrementChange = (e) => {
    setIncrementAmount(parseInt(e.target.value));
  };

  let expiredDate = item.duration;

  return (
    <Countdown
      owner={currentUser}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      increaseBid={increaseBid}
      item={item}
      renderer={(props) => Renderer({ ...props, owner: currentUser, item, bidAuction, endAuction, increaseBid, incrementAmount, handleIncrementChange })}
    />
  );
};

export default AuctionCard;
