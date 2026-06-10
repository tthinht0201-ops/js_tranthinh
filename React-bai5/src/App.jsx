import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched"
  })

  const handleOnSubmit = (data) => {
    console.log("data:", data)
  }

  console.log("errors:", errors)

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <input placeholder="Nhap username" {...register("username", {
          required: "ban phai nhap username"
        })} />
        {
          errors.username?.message !== undefined && <p style={{
            color: "red"
          }}>{errors.username?.message}</p>
        }
      </div>

      <div>
        <input placeholder="nhap password" {...register("password", {
          validate: (value) => value.length >= 8 || " toi thieu 8 ki tu"
        })} />

        {
          errors.password?.message !== undefined && <p style={{
            color: "red"
          }}>{errors.password?.message}</p>
        }
      <button type='submit'>click here</button>
      </div>
    </form>
  )
}

export default App
