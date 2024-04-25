import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import RegionWiseTaskExpand from "../../Assets/RegionWiseTaskExpand.svg";
import Chennai from "../../Assets/Chennai.svg";
import Close from "../../Assets/CloseModal.svg";
import styled from "styled-components";
import { Line } from "rc-progress";
import axios from "axios";

const regionWiseTaskData = [
  {
    id: 1,
    img: Chennai,
    location: "Chennai",
    pending: 100,
    total: 150,
  },
  {
    id: 2,
    img: Chennai,
    location: "Madurai",
    pending: 230,
    total: 250,
  },
  {
    id: 3,
    img: Chennai,
    location: "Rajapalayam",
    pending: 130,
    total: 150,
  },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "50%",
    height: "80%",
    borderRadius: "16px",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.25)",
    // marginBottom: '4rem',
    zIndex: "999",
  },
};

const FillColor = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 10px;
  position: relative;
  background-color: #e8f5fe;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default function RegionWiseTask() {
  const [modalOpen, setModalOpen] = useState(false);
  const [regionStat, setRegionStat] = useState(null);
  const regionStat1 = [];
  const [loading, setLoading] = useState(true);

  const colors = ["#2D7DF9", "#26CBA0", "#F6A24B"];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getRegionStat = async () => {
    try {
      const res = await axios.get(
        "http://192.168.0.115:8001/task/managers/660aa4d54a8e525d204aaa77"
      );
      setRegionStat(res.data.regionStats);
      console.log(res.data.regionStats);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRegionStat();
  }, []);


  return (
    <div className="task-region-wise-stat">
      <div className="region-wise-top">
        <div className="region-text">Regions</div>
        <img
          src={RegionWiseTaskExpand}
          alt=""
          onClick={openModal}
          style={{ cursor: "pointer" }}
        />
      </div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="location-task-data"
        style={{
          overflowY: 'hidden',
        }}
        >
          {regionStat.map((data, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                columnGap: "20px",
              }}
            >
              {/* <div className="location-img-box">
              <img src={data.img} alt="" />
            </div> */}
              <div className="location-box">
                <div className="location-text">{data.location}</div>
                <div className="location-pending-box">
                  {/* <div className="color-fill"></div> */}
                  {/* <FillColor style={{ backgroundColor: "green" }}></FillColor> */}
                  <Line
                    percent={(data.completed / data.total) * 100}
                    strokeWidth={2}
                    strokeColor="#29AB87"
                    trailWidth={2}
                    trailColor="rgba(235, 231, 255, 0.3)"
                  />
                  <div className="pending-text">
                    {data.completed}/{data.total}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={modalOpen}
        onAfterOpen={openModal}
        onAfterClose={closeModal}
        style={customStyles}
      >
        <div className="location-task-data">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="region-text">Regions</div>
            <img
              src={Close}
              alt=""
              onClick={closeModal}
              style={{ cursor: "pointer" }}
            />
          </div>
          {loading ? (
            <div>loading...</div>
          ) : (
            regionStat.map((data, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "1rem",
                  marginTop: "1rem",
                }}
              >
                {/* <div className="location-img-box">
                    <img src={data.img} alt="" />
                  </div> */}
                <div className="location-box">
                  <div className="location-text">{data.location}</div>
                  <div className="location-pending-box">
                    {/* <div className="color-fill"></div> */}
                    <Line
                      percent={(data.completed / data.total) * 100}
                      strokeWidth={2}
                      strokeColor="#29AB87"
                      trailWidth={2}
                      trailColor="rgba(235, 231, 255, 0.3)"
                    />
                    <div className="pending-text">
                      {data.total - data.completed}
                    </div>
                    <div>pending</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
