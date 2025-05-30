import React, { useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const dates = [
  { day: 'MON', date: '05 MAY' },
  { day: 'TUE', date: '06 MAY' },
  { day: 'WED', date: '07 MAY' },
  { day: 'THU', date: '08 MAY' },
  { day: 'FRI', date: '09 MAY' },
  { day: 'SAT', date: '10 MAY' },
  { day: 'SUN', date: '11 MAY' },
];

const timeSlots = [
  '05:00', '05:30', '06:00', '06:30', '07:00',
  '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00',
  '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
  '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00',
  '22:30', '23:00',
];

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('07 MAY');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Booking');
  const listRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = item.date === selectedDate;
    return (
      <TouchableOpacity
        style={[styles.dateItem, isSelected && styles.selectedDate]}
        onPress={() => {
          setSelectedDate(item.date);
          scrollToIndex(index);
        }}>
        <Text style={[styles.dayText, isSelected && styles.selectedText]}>{item.day}</Text>
        <Text style={[styles.dateNumber, isSelected && styles.selectedText]}>
          {item.date.split(' ')[0]}
        </Text>
        <Text style={[styles.dateMonth, isSelected && styles.selectedText]}>
          {item.date.split(' ')[1]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {['Home', 'Booking', 'Activities', 'Membership'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.tabButtonActive
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.tabTextActive
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedDate && selectedTime && (
        <View style={styles.bookingInfo}>
          <Text style={styles.summaryText}>
            You selected {selectedDate} at {selectedTime}
          </Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => alert('Booking confirmed!')}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.listWrapper}>
        <FlatList
          ref={listRef}
          data={dates}
          horizontal
          keyExtractor={(item) => item.date}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateList}
          getItemLayout={(data, index) => (
            { length: 80, offset: 80 * index, index }
          )}
        />
      </View>
      <View>

      </View>
      <View style={styles.slotGrid}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.slotItem,
              selectedTime === slot && styles.slotItemSelected,
            ]}
            onPress={() => setSelectedTime(slot)}
          >
            <Text style={[
              styles.slotText,
              selectedTime === slot && styles.slotTextSelected,
            ]}>
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#F0F0F0', // light background like Figma
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: 4,
  },
  tabButtonActive: {
    backgroundColor: '#00E8B1',
    borderColor: '#00E8B1',
  },
  tabText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  tabTextActive: {
    fontWeight: '700',
    color: '#000',
  },


  bookingInfo: {
    marginTop: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#222',
  },
  bookButton: {
    backgroundColor: '#00E8B1',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 60,
    alignItems: 'center',
  },
  listWrapper: {
    width: '95%',
    left: 10,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 45,
    borderBottomLeftRadius: 45,
    overflow: 'hidden',
  },
  dateList: {

  },
  dateItem: {
    width: 60,
    height: 60,
    borderRadius: 45,
    // marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  selectedDate: {
    backgroundColor: '#00E8B1',
    width: 60,
    height: 60,
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  dateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dateMonth: {
    fontSize: 12,
    color: '#000',
  },
  selectedText: {
    color: '#000',
  },


  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
  },
  slotItem: {
    width: 68,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    marginTop: 12,
  },
  slotItemSelected: {
    backgroundColor: '#00E8B1',
  },
  slotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  slotTextSelected: {
    color: '#000',
  },
});
