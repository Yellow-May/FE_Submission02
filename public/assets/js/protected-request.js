const protectedFetch = async (url, method = "GET") => {
   const AUTH_DATA = JSON.parse(localStorage.getItem("FE_Submission02_Auth"));

   try {
      const firstRes = await fetch(url, {
         method,
         headers: {
            Authorization: `Bearer ${AUTH_DATA.access_token}`
         }
      });

      if (firstRes.status === 401) {
         const newAccessToken = await RefreshTokens(AUTH_DATA.refresh_token);

         if (newAccessToken) {
            const secondRes = await fetch(url, {
               method,
               headers: {
                  Authorization: `Bearer ${newAccessToken}`
               }
            })
            return (await secondRes.json());
         } else {
            alert('There was an error');
         }
      }

      return (await firstRes.json())
   } catch (error) {
      // alert("There was an error")
   }
}


async function RefreshTokens(refresh_token) {
   try {
      const res = await fetch(`https://freddy.codesubmit.io/refresh`, {
         method: "POST",
         headers: {
            Authorization: `Bearer ${refresh_token}`
         }
      });
      const data = await res.json();
      if (data.access_token) {
         localStorage.setItem("FE_Submission02_Auth", JSON.stringify({ ...data, refresh_token }));
         return data.access_token;
      } else {
         return null
      }
   } catch (error) {
      console.error(error);
   }
}

export default protectedFetch