import { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const dates = [
  { day: 'MON', date: '05', month: 'MAY' },
  { day: 'TUE', date: '06', month: 'MAY' },
  { day: 'WED', date: '07', month: 'MAY' },
  { day: 'THU', date: '08', month: 'MAY' },
  { day: 'FRI', date: '09', month: 'MAY' },
  { day: 'SAT', date: '10', month: 'MAY' },
  { day: 'SUN', date: '11', month: 'MAY' },
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
  const [selectedDate, setSelectedDate] = useState('07');
  const [selectedTime, setSelectedTime] = useState('08:30');
  const [activeTab, setActiveTab] = useState('Booking');
  const [isFavorite, setIsFavorite] = useState(false);
  const listRef = useRef<FlatList>(null);

  const renderDateItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = item.date === selectedDate;
    return (
      <TouchableOpacity
        style={[styles.dateItem, isSelected && styles.selectedDate]}
        onPress={() => setSelectedDate(item.date)}>
        <Text style={[styles.dayText, isSelected && styles.selectedText]}>{item.day}</Text>
        <Text style={[styles.dateNumber, isSelected && styles.selectedText]}>
          {item.date}
        </Text>
        <Text style={[styles.monthText, isSelected && styles.selectedText]}>
          {item.month}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Image 
              source={require('../../assets/images/padlcenter.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.facilityName}>Padlcenter trosa Vagnharad</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Text style={styles.favoriteText}>Favorite</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Selection */}
        <View style={styles.dateSection}>
          <FlatList
            ref={listRef}
            data={dates}
            horizontal
            keyExtractor={(item) => item.date}
            renderItem={renderDateItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          />
        </View>

        {/* Time Zone Info */}
        <Text style={styles.timezoneText}>Central time zone: Europe/Stockholm</Text>

        {/* Time Slots Grid */}
        <View style={styles.timeSlotsContainer}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: '75%',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  logoImage: {
    width: 64,
    height: 64,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  facilityName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  facilityLocation: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  favoriteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00E8B1',
    backgroundColor: 'transparent',
    maxWidth: 100,
  },
  favoriteText: {
    color: '#00E8B1',
    fontSize: 14,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#00E8B1',
  },
  tabText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  dateSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    marginTop: 1,
  },
  dateList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  dateItem: {
    width: 70,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  selectedDate: {
    backgroundColor: '#00E8B1',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  monthText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  timezoneText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ADB5BD',
    marginVertical: 16,
  },
  timeSlotsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotItem: {
    width: '18%',
    aspectRatio: 2,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  slotItemSelected: {
    backgroundColor: '#00E8B1',
  },
  slotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  slotTextSelected: {
    color: '#FFFFFF',
  },
});
