import Timer from '../../components/Timer';
import ShiftList from '../../components/ShiftList';
import styles from './Shifts.module.css'

const Shifts: React.FC = () => (
  <div className={styles.container}>
    <Timer />
    <ShiftList />
  </div>
)


export default Shifts
