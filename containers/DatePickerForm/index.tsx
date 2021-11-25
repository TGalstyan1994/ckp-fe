import { Select } from 'components/Select'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  datePicker_wrapper,
  datePicker_header,
  datePicker_options,
} from './style.module.css'

const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate()

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

type Props = {
  dateForm: {
    day: string
    month: string
    year: string
  }
  error?: string
  setDateForm: Dispatch<
    SetStateAction<{ day: string; month: string; year: string }>
  >
}

export const DatePickerForm: FC<Props> = ({ dateForm, setDateForm, error }) => {
  const [options, setOptions] = useState({
    days: [] as number[],
    months: monthNames,
    years: Array.from({ length: 60 }, (_, i) => i + 1960),
  })

  const setYear = (option: string) => {
    setDateForm((prev) => ({ ...prev, year: option, day: '', month: '' }))
  }

  const setMonth = (option: string) => {
    setDateForm((prev) => ({
      ...prev,
      month: monthNames.indexOf(option).toString(),
      day: '',
    }))

    setOptions((prev) => ({
      ...prev,
      days: Array.from(
        { length: daysInMonth(monthNames.indexOf(option) + 1, +dateForm.year) },
        (_, i) => i + 1
      ),
    }))
  }

  const setDay = (option: string) => {
    setDateForm((prev) => ({ ...prev, day: option }))
  }

  return (
    <div className={datePicker_wrapper}>
      <span className={datePicker_header}>Date of birth</span>
      <div className={datePicker_options}>
        <Select
          options={options.years.map((e) => e.toString())}
          currentOption={dateForm.year}
          setCurrentOption={setYear}
          placeholder="Select Year"
          error={dateForm.year === '' ? error : ''}
        />
        <Select
          options={options.months.map((e) => e.toString())}
          currentOption={(dateForm.month && monthNames[+dateForm.month]) || ''}
          setCurrentOption={setMonth}
          placeholder="Select Month"
          disabled={!dateForm.year}
          error={dateForm.month === '' ? error : ''}
        />
        <Select
          options={options.days.map((e) => e.toString())}
          currentOption={dateForm.day}
          setCurrentOption={setDay}
          placeholder="Select Day"
          disabled={!dateForm.year || !dateForm.month}
          error={dateForm.day === '' ? error : ''}
        />
      </div>
    </div>
  )
}
