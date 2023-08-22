import React, { createContext, useState } from "react";
export const AdminContext = createContext();
import {  setDoc, doc , db , storage , ref, uploadBytes, getDownloadURL, updateDoc , deleteDoc, refFromURL, deleteObject } from '../../firebase';



export const AdminContextProvider = ({ children }) => {
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSucces] = useState(null);

  const makeid = (length) =>  {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

  const addEvent = async (eventName , eventDesc , eventLocation , eventStatus , eventDate , eventRating , eventThum , eventBanner ) => {

    setIsLoading(true);

    if (eventName == '' ) {
      setError("يرجى ادخال اسم المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventDesc == '' ) {
      setError("يرجى ادخال وصف المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventLocation == '' ) {
      setError("يرجى ادخال مكان المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventStatus == '' ) {
      setError("يرجى ادخال حالة المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventDate == '' ) {
      setError("يرجى ادخال تاريخ المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventRating == '' ) {
      setError("يرجى ادخال تقييم المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    
    if (eventThum == '' ) {
      setError("يرجى رفع صورة المسرحية");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    let idMaked = makeid(20);
    try {
      const events = await setDoc(doc(db, 'events', idMaked), {
        event_name: eventName,
        event_desc: eventDesc,
        event_location: eventLocation,
        event_status: eventStatus,
        event_date: eventDate,
        event_rating: eventRating,
        event_image: eventThum ? eventThum._j : '',
        event_banner: eventBanner ? eventBanner._j : '',
      });
      setSucces("تمت اضافة المسرحية بنجاح");
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      // Error occurred while creating the event, handle the error
     setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const editEvent = async (eventId , eventName , eventDesc , eventLocation , eventStatus , eventDate , eventRating , eventThum , eventBanner ) => {

    setIsLoading(true);

    if (eventName == '' ) {
      setError("يرجى ادخال اسم المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventDesc == '' ) {
      setError("يرجى ادخال وصف المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventLocation == '' ) {
      setError("يرجى ادخال مكان المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventStatus == '' ) {
      setError("يرجى ادخال حالة المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventDate == '' ) {
      setError("يرجى ادخال تاريخ المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (eventRating == '' ) {
      setError("يرجى ادخال تقييم المسرحية ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    
    if (eventThum == '' ) {
      setError("يرجى رفع صورة المسرحية");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    try {

      const docRef = doc(db, "events", eventId);

    const data = {
      event_name: eventName,
      event_desc: eventDesc,
      event_location: eventLocation,
      event_status: eventStatus,
      event_date: eventDate,
      event_rating: eventRating,
      event_image: eventThum ? eventThum._j : '',
      event_banner: eventBanner ? eventBanner._j : '',

    };

    setDoc(docRef, data);
      setSucces("تم تعديل المسرحية بنجاح");
      setTimeout( () => {
        setSucces('');
      } , 2500 );
     
    } catch (error) {
      // Error occurred while creating the event, handle the error
     setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const addActor = async ( actorName, actorJob , actorThum , event_rel_id ) => {

    setIsLoading(true);

    if (actorName == '' ) {
      setError("يرجى ادخال اسم الممثل ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (actorJob == '' ) {
      setError("يرجى ادخال دور الممثل ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (actorThum == '' ) {
      setError("يرجى رفع صورة الممثل");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    let idMaked = makeid(20);

    try {
      const actors = await setDoc(doc(db, 'actors', idMaked), {
        actor_name: actorName,
        actor_job: actorJob,
        actor_thum: actorThum ? actorThum._j : '',
        rel_event_id: event_rel_id,

      });
      setSucces("تمت اضافة الممثل بنجاح");
      setTimeout( () => {
        setSucces('');
      } , 2500 );
    }
    catch (error) {
      // Error occurred while creating the event, handle the error
     setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

      
     
    


  }

  const addShow = async ( date , startTime , endTime , status , event_rel_id ) => {

    setIsLoading(true);
    if (date == '' ) {
      setError("يرجى ادخال تاريخ العرض ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (startTime == '' ) {
      setError("يرجى ادخال وقت العرض ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (endTime == '' ) {
      setError("يرجى ادخال وقت العرض ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (status == '' ) {
      setError("يرجى ادخال حالة العرض");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    try {
      let idMaked = makeid(20);
    const shows = await setDoc(doc(db, 'shows', idMaked), {
      show_date: date,
      show_start_time: startTime,
      show_end_time: endTime,
      show_status: status,
      rel_event_id: event_rel_id

    });
    setSucces("تمت اضافة العرض بنجاح");
    setTimeout( () => {
      setSucces('');
    } , 2500 );
    }
    catch (error) {
      // Error occurred while creating the event, handle the error
     setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

  }

  const editShow = async ( date , startTime , endTime , status , event_rel_id , eventId ) => {

    setIsLoading(true);
    if (date == '' ) {
      setError("يرجى ادخال تاريخ العرض ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (startTime == '' ) {
      setError("يرجى ادخال وقت العرض ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (endTime == '' ) {
      setError("يرجى ادخال وقت العرض ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (status == '' ) {
      setError("يرجى ادخال حالة العرض");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    try {

      const docRef = doc(db, "shows", event_rel_id);

      const data = {
        show_date: date,
        show_start_time: startTime,
        show_end_time: endTime,
        show_status: status ? status : 'true',
        rel_event_id: eventId
      };
  
      setDoc(docRef, data);
        setSucces("تم تعديل الوقت بنجاح");
        setTimeout( () => {
          setSucces('');
        } , 2500 );
        
    }
    catch (error) {
      // Error occurred while creating the event, handle the error
     setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }

   
     
  
  }

  const editActor = async ( actorName, actorJob , actorThum , event_rel_id) => {

    setIsLoading(true);
    if (actorName == '' ) {
      setError("يرجى ادخال اسم الممثل ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (actorJob == '' ) {
      setError("يرجى ادخال دور الممثل ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    if (actorThum == '' ) {
      setError("يرجى رفع صورة الممثل");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    try {
      const docRef = doc(db, "actors", event_rel_id);

      const data = {
        actor_name: actorName,
        actor_job: actorJob,
        actor_thum: actorThum ? actorThum._j : '',
      };
  
      updateDoc(docRef, data);
        setSucces("تم تعديل الممثل بنجاح");
        setTimeout( () => {
          setSucces('');
        } , 2500 );
    }
    catch (e) { 
      setError("حدث خطأ في العملية");
      setTimeout( () => {
       setError('');
     } , 2500 );
    }

     

  }

  const editTicket = async ( ticketSeat, ticketPrice , ticketCategory , event_rel_id) => {

    setIsLoading(true);
    if (ticketCategory == '' ) {
      setError("يرجى ادخال فئة التذكرة ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (ticketSeat == '' ) {
      setError("يرجى ادخال رقم المقعد الخاص بالتذكرة ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (ticketPrice == '' ) {
      setError("يرجى ادخال سعر التذكرة ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    try {

      const docRef = doc(db, "tickets", event_rel_id);

      const data = {
        ticket_category: ticketCategory,
        ticket_seat: ticketSeat,
        ticket_price: ticketPrice,

      };
  
      updateDoc(docRef, data);
        setSucces("تم تعديل التذكرة بنجاح");
        setTimeout( () => {
          setSucces('');
        } , 2500 );
    }
    catch (error) {
      setError("حدث خطأ في العملية");
     setTimeout( () => {
      setError('');
    } , 2500 );
    }
      
        
  
  }

  const addTicket = async (ticketCategory , ticketSeat , ticketPrice , realtedOffer , tikcetNumber , event_rel_id  ) => {

    setIsLoading(true);
    if (ticketCategory == '' ) {
      setError("يرجى ادخال فئة التذكرة ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (ticketSeat == '' ) {
      setError("يرجى ادخال رقم المقعد الخاص بالتذكرة ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (ticketPrice == '' ) {
      setError("يرجى ادخال سعر التذكرة ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }
    if (realtedOffer == '' ) {
      setError("يرجى ادخال العرض المتربط بالتذكرة ");
       setTimeout(() => {
      setError('');
    } , 3000);
      return;
    }

    let idMaked = makeid(20);

    try {
      for (let i = 1; i <= tikcetNumber; i++) {
        let ticketed_seat = `${ticketSeat}${i}`;
        const ticketDocId = `${idMaked}_${i}`;
    
        const ticket = {
          ticket_category: ticketCategory,
          ticket_seat: ticketed_seat,
          ticket_price: ticketPrice,
          ticket_offer: realtedOffer,
          rel_event_id: event_rel_id
        };
    
        const ticketDocRef = doc(db, 'tickets', ticketDocId);
        await setDoc(ticketDocRef, ticket);
      }
    
      setSucces("تمت إضافة التذاكر بنجاح");
      setTimeout(() => {
        setSucces('');
      }, 2500);
    } catch (error) {
      // Error occurred while creating the tickets, handle the error
      setError("حدث خطأ في العملية");
      setTimeout(() => {
        setError('');
      }, 2500);
    }



  }

  const uploadImage = async (uri) => {
   
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const path = `images/${filename}`;
  
    const storageRef = ref(storage, path);
  
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(storageRef);
      setSucces("تم بنجاح رفع الصورة");
      setTimeout( () => {
        setSucces('');
      } , 2500 );
      return downloadURL;
      // Do something with the download URL
    } catch (error) {
     setError("حدث خطأ اثناء رفع الصورة");
     setTimeout( () => {
      setError('');
    } , 2500 );
      // Handle the error
    }
  };

  function convertDateToArabic(dateObject) {
    const months = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
  
    const date = new Date(dateObject.seconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const arabicMonth = months[monthIndex];
    const arabicDay = date.getDate().toString();
  
    return `${arabicDay} ${arabicMonth} ${year}`;
  }

  function convertTimeToHourMinuteString(timeObject) {
    const date = new Date(timeObject.seconds * 1000); // Convert seconds to milliseconds
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if necessary
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if necessary
  
    return `${hours}:${minutes}`;
  }

  function convertTimeToDateTimeString(timeObject) {
    if (!timeObject.seconds) {
      return ''; // Return an empty string if seconds property is undefined
    }
  
    const date = new Date(timeObject.seconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} - ${hours}:${minutes}`;
  }

  function convertTimeToDateString(timeObject) {
    if (!timeObject.seconds) {
      return ''; // Return an empty string if seconds property is undefined
    }
  
    const date = new Date(timeObject.seconds * 1000); // Convert seconds to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

  
    return `${year}-${month}-${day}`;
  }

  const deleteRecord = async (table, id) => {
    try {
      await deleteDoc(doc(db, table, id));
      setSucces("تم الحذف بنجاح");
      setTimeout(() => {
        setSucces('');
      }, 3500);
      // Additional actions or state updates upon successful deletion
    } catch (error) {
      setError("حدث خطأ في العملية");
      setTimeout(() => {
        setError('');
      }, 3500);
     
    }
  };

  const deleteObjectFromFirestore = (url) => {

    const storageRef = ref(storage, url);

// Delete the image
deleteObject(storageRef)
  .then(() => {
    // Deletion successful
    console.log("Image deleted successfully");
  })
  .catch((error) => {
    // Error occurred during deletion
    console.error("Error deleting image:", error);
  });

  }

  return (
    <AdminContext.Provider
      value={{ 
        isLoading,
        error,
        success,
        addEvent,
        editEvent,
        editShow,
        setError,
        addActor,
        editActor,
        editTicket,
        addShow,
        addTicket,
        uploadImage,
        deleteRecord,
        deleteObjectFromFirestore,
        convertDateToArabic,
        convertTimeToHourMinuteString,
        convertTimeToDateTimeString,
        convertTimeToDateString
       }}
    >
      {children}
    </AdminContext.Provider>
  );
};
