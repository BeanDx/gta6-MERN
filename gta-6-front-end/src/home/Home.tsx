import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Home.module.css'
import { useState } from 'react';

interface IFormState {
  name: string
  email: string
}
function Home() {
  const { register, handleSubmit } = useForm<IFormState>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    console.log(data);

    fetch('http://localhost:3000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setIsSuccess(data.isSuccess);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Form submitted!</div>
        ) : (
          <>
            <h1>GTA 6 - Leave a request</h1>
            <input type="name" placeholder='Enter Ur Name...' {...register('name')} />
            <input type="email" placeholder='Enter Email...' {...register('email')} />
            <button>I want GTA!</button>
          </>
        )}
      </form>
    </div>
  );
}
export default Home