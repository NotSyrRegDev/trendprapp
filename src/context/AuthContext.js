import React, { createContext, useState, useContext } from "react";
import { onAuthStateChanged , signInWithEmailAndPassword , auth  , setDoc , createUserWithEmailAndPassword , doc , db, signOut  , where , query , collection , getDocs , updateDoc  , or} from '../../firebase';
export const AuthenticationContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContextProvider = ({ children }) => {
 
  const [foundedMovies , setFoundedMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [ success , setSuccess ] = useState(null);
  const [isAdmin , setIsAdmin ] = useState(false);

  onAuthStateChanged(auth,  async (usr) => {
    const value = await AsyncStorage.getItem('trendpr_user');
    let jsonPrsed = JSON.parse(value);

    setIsAdmin(jsonPrsed.admin);
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } 
    else {
      setIsLoading(false);
    }
   

  });

  
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

  const searchMovie  = async (searchVar) => {
    try {
      const q = query(collection(db, 'events'),
      or(
        where('event_name', '==', searchVar),
        where('tags', 'array-contains', searchVar)
      )
      );
      const querySnapshot = await getDocs(q);
      const matchingProducts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log('Search Query:', searchVar);
      console.log('Matching Products:', matchingProducts);
      setFoundedMovies(matchingProducts);
    } catch (error) {
      console.error('Error in search:', error);
      // Handle the error as needed (e.g., show an error message to the user).
    }
    
  };

  const onLogin =  ( email , password ) => {
    setIsLoading(true);
    if (email == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      setIsLoading(false);
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      setIsLoading(false);
      
    } , 3000);
      return;
    }

  
    signInWithEmailAndPassword(auth, email, password)
      .then(  async (userCredential) => {

        const q = query(collection(db, "users"), where("email", "==", email ) );
   
        const querySnapshot = await getDocs(q);
      
        const usersDataArray = querySnapshot.docs ? querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) : '';

        if ( usersDataArray.length !== 0  ) {

        if (usersDataArray[0].role === 'admin') {
          const userObject = {
            id: usersDataArray[0].id,
            full_name: usersDataArray[0].full_name,
            phone_number: usersDataArray[0].phone_number,
            email: usersDataArray[0].email,
            admin: true,
          }
          await AsyncStorage.setItem('trendpr_user', JSON.stringify(userObject));
          setIsAdmin(true);
          setIsLoading(false);
          return;
         }
         else  if (usersDataArray[0].role !== 'admin') {

          const userObject = {
            id: usersDataArray[0].id,
            full_name: usersDataArray[0].full_name,
            phone_number: usersDataArray[0].phone_number,
            email: usersDataArray[0].email,
            admin: false,
          }
          await AsyncStorage.setItem('trendpr_user', JSON.stringify(userObject));
  
          const user = userCredential.user;
          setUser(user);
          setIsLoading(false);
         }
      }
      else {
        setError("لم نعثر على المستخدم");
        setTimeout(() => {
          setError('');
        } , 3000);
      }
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        setTimeout(() => {
          setError('');
        } , 3000);
      });
  }
 
  const onRegister = async (fullName , phoneNumber , userEmail , password) => {
    setIsLoading(true);

    if (fullName == '' ) {
      setError("يرجى ادخال اسمك الكامل");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (phoneNumber == '' ) {
      setError("يرجى ادخال رقم الهاتف");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (userEmail == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

      let idMaked = makeid(20);
  const users = await setDoc(doc(db, "users", idMaked ), {
    full_name: fullName,
    phone_number: phoneNumber,
    email: userEmail,
    role: 'user',

    });

    createUserWithEmailAndPassword(auth, userEmail, password)
      .then( async (userCredential) => {
        try {
          const userObject = {
            id: idMaked,
            full_name: fullName,
            phone_number: phoneNumber,
            email: userEmail,
          }
          await AsyncStorage.setItem('trendpr_user', JSON.stringify(userObject));
         
        } catch (error) {
         
        }
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
     
       
      })
      .catch((e) => {
        setIsLoading(false);
       
        if (e.code === "auth/email-already-in-use") {
          setError("الايميل موجود بالفعل , يرجى تسجيل الدخول");
        } else if (e.code === "auth/invalid-email") {
          setError("الايميل غير صحيح , يرجى كتابة الايميل بشكل صحيح");
        } 
         else if (e.code === "auth/weak-password") {
          setError("كلمة المرور ضعيفة يرجى ادخال كلمة مرور أقوى");
        } else if (e.code === "auth/network-request-failed") {
          setError("حدث خطأ في الشبكة");
        } else if (e.code === "auth/too-many-requests") {
          setError("تم تجاوز عدد المحاولات المسموح به , يرجى المحاولة في وقت أخر");
        } else if (e.code === "auth/user-disabled") {
          setError("تم تعطيل حسابك , يرجى التواصل مع الدعم");
        } else {
          setError(e.toString());
        }
        setTimeout(() => {
          setError('');
        } , 3000);

      });

   }
 
  const onAddAdmin = async (fullName , phoneNumber , userEmail , password) => {
    setIsLoading(true);

    if (fullName == '' ) {
      setError("يرجى ادخال اسمك الكامل");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (phoneNumber == '' ) {
      setError("يرجى ادخال رقم الهاتف");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (userEmail == '' ) {
      setError("يرجى ادخال الايميل الخاص بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (password == '' ) {
      setError("يرجى ادخال كلمة المرور الخاصة بك");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

      let idMaked = makeid(20);
  const users = await setDoc(doc(db, "users", idMaked ), {
    full_name: fullName,
    phone_number: phoneNumber,
    email: userEmail,
    role: 'admin',

    });

    createUserWithEmailAndPassword(auth, userEmail, password)
      .then( async (userCredential) => {
        setSuccess("تمت اضافة الحساب بنجاح")
        setIsLoading(false);
     
       
      })
      .catch((e) => {
        setIsLoading(false);
       
        if (e.code === "auth/email-already-in-use") {
          setError("الايميل موجود بالفعل , يرجى تسجيل الدخول");
        } else if (e.code === "auth/invalid-email") {
          setError("الايميل غير صحيح , يرجى كتابة الايميل بشكل صحيح");
        } 
         else if (e.code === "auth/weak-password") {
          setError("كلمة المرور ضعيفة يرجى ادخال كلمة مرور أقوى");
        } else if (e.code === "auth/network-request-failed") {
          setError("حدث خطأ في الشبكة");
        } else if (e.code === "auth/too-many-requests") {
          setError("تم تجاوز عدد المحاولات المسموح به , يرجى المحاولة في وقت أخر");
        } else if (e.code === "auth/user-disabled") {
          setError("تم تعطيل حسابك , يرجى التواصل مع الدعم");
        } else {
          setError(e.toString());
        }
        setTimeout(() => {
          setError('');
        } , 3000);

      });

   }

   const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setIsAdmin(false);
      setError(null);
    });
  };

  const addOrder = async ( uid , name , email , phone , fullPrice , tickets , eventId , callBack ) => {
    setIsLoading(true);
    
    if (fullPrice == 0 || tickets == [] ) {
      setError("يرجى اختيار تذاكر");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    let idMaked = makeid(20);

    try {
      const bookings = await setDoc(doc(db, 'bookings', idMaked), {
        user_id: uid,
        user_name :name,
        user_email: email,
        user_phone: phone,
        order: tickets,
        total_price: fullPrice,
        rel_event_id: eventId

      });

      setSuccess("تمت اضافة عملية الحجز بنجاح");
      setTimeout( () => {
        setSuccess('');
        if (callBack) {
          callBack();
        }
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

  const editUserProfile = async ( id , fullName , email , phoneNumber , callBack ) => {

    setIsLoading(true);


    if (fullName == '' ) {
      setError("يرجى ادخال الاسم الكامل");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (email == '' ) {
      setError("يرجى ادخال الايميل");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    if (phoneNumber == '' ) {
      setError("يرجى ادخال رقم الهاتف");
       setTimeout(() => {
      setError('');
      
    } , 3000);
      return;
    }

    const existingValue = await AsyncStorage.getItem('trendpr_user');
    const parsedValue = JSON.parse(existingValue);
    parsedValue.full_name = fullName;
    parsedValue.email = email;
    parsedValue.phone_number = phoneNumber;
    await AsyncStorage.setItem('trendpr_user', JSON.stringify(parsedValue));


    const docRef = doc(db, "users", id);
  
    const data = {
      phone_number: phoneNumber,
      full_name: fullName,
      email: email,
    };

   await updateDoc(docRef, data);

    setSuccess("تم بنجاح تعديل معلوماتك");
   
    setTimeout(() => {
      setSuccess(null);
      if (callBack) {
        callBack();
      }
      setIsLoading(false);
    } , 3000);

  }

  return (
    <AuthenticationContext.Provider
      value={{ 
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        error,
        setError,
        success,
        onLogin,
        editUserProfile,
        onRegister,
        addOrder,
        onLogout,
        searchMovie,
        foundedMovies,
        onAddAdmin
        
       }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
