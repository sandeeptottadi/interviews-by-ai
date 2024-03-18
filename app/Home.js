"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const isLoggedInData = (userData) => ({
  type: "isLoggedIn",
  payload: userData,
});

const tokenData = (token) => ({
  type: "token",
  payload: token,
});

const isSubscribedData = (subscriptionData) => ({
  type: "isSubscribed",
  payload: subscriptionData,
});

const setEmail = (email) => ({
  type: "email",
  payload: email,
});

const setSubscription_ends_at = (date) => ({
  type: "subscription_ends_at",
  payload: date,
});

const isSubscriptionCanceled = (isCanceled) => ({
  type: "isSubscriptionCanceled",
  payload: isCanceled,
});

export default function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    function getCookie(cookieName) {
      const name = `${cookieName}=`;
      const decodedCookies = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookies.split(";");

      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return "No token found!";
    }

    dispatch(tokenData(getCookie("token")));
  }, []);

  useEffect(() => {
    async function getEmailId() {
      if (!auth.token) return;
      const token = auth.token;
      await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/get_email_id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: auth.token,
        },
        credentials: "omit",
      })
        .then((res) => {
          if (!res.ok) {
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data) dispatch(setEmail(data.email));
        });
    }

    if (auth.token) getEmailId();

    async function isLoggedIn() {
      if (!auth.token) return;
      await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/isLoggedIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: auth.token,
        },
        credentials: "omit",
      }).then((res) => {
        if (!res.ok) {
          dispatch(isLoggedInData(false));
        }
        return res
          .json()
          .then((data) => {
            dispatch(isLoggedInData(data.isLoggedIn));
          })
          .catch((e) => {
            dispatch(isLoggedInData(false));
          });
      });
    }

    isLoggedIn();

    async function isSubscribed() {
      if (!auth.token) return;
      if (auth.token === "No token found!") {
        dispatch(isSubscribedData(false));
        return;
      }
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/isSubscribed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: auth.token,
        },
        credentials: "omit",
      }).then((res) => {
        if (!res.ok) {
          return;
        }
        return res.json().then((data) => {
          if (data["email"])
            localStorage.setItem("joby_subscribed_email", data["email"]);
          else localStorage.removeItem("joby_subscribed_email");
          dispatch(setSubscription_ends_at(data["subscription_ends_at"]));
          dispatch(isSubscribedData(data["isSubscribed"]));
          dispatch(isSubscriptionCanceled(data["isSubscriptionCanceled"]));
        });
      });
    }

    if (auth.token) {
      isSubscribed();
    }
  }, [auth.token]);
  return <div>Home</div>;
}
