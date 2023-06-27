import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import styles from "@/components/Pages/Testimonials/TestimonialsThree.module.css";

const Feedbacks = [
  {
    id: 1,
    feedbackText: "We look and sound so good! I am still in shock at how smooth this process was. The professionalism, collaboration and the design they come up is great.",
    image: "/images/member1.png",
    name: "Roberto",
    designation: 'React Developer',
    ratings: [
      {
        id: 1,
        icon: "ri-star-fill",
      },
      {
        id: 2,
        icon: "ri-star-fill",
      },
      {
        id: 3,
        icon: "ri-star-fill",
      },
      {
        id: 4,
        icon: "ri-star-fill",
      },
      {
        id: 5,
        icon: "ri-star-fill",
      }
    ]
  }
]

const TestimonialsThree = ({ notices }) => {
  const [sortedNotices, setSortedNotices] = useState([])
  useEffect(()=>{
    // const sortedData = notices.sort((a, b) => b.createdAt - a.createdAt);
    setSortedNotices(notices)
    console.log(notices)
  }, [])
  return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "30px",
          mb: "30px",
        }}
      >
        <Typography
          as="h3"
          sx={{
            fontSize: 18,
            fontWeight: 500,
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "5px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          Notices
        </Typography>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1400: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination]}
          className="testimonialStyle3"
        >
          {notices.map((notice) => (
            <SwiperSlide key={notice._id}>
              <div className={styles.feedbackContent}>
                <div className={styles.feedbackText}>
                  <div className={styles.feedbackImg}>
                    <div>
                      <img src={Feedbacks[0].image} alt="Client" />
                    </div>

                    <div>
                      <h4>{notice.title}</h4>
                      <p>{notice.createdBy.username}</p>
                      <ul>
                      {new Date(notice.createdAt).toDateString()}
                      </ul>
                    </div>
                  </div>

                  <q>
                    {notice.content}
                  </q>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Card>
    </>
  );
};

export default TestimonialsThree;
