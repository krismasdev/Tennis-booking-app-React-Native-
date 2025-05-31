import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Type definition for date items
interface DateItem {
  day: string;
  date: string;
  month: string;
  fullDate: Date;
}

// Function to generate date list starting from a specific date
const generateDateList = (startDate: Date, numDays: number = 17): DateItem[] => {
  const dateList: DateItem[] = [];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  
  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    dateList.push({
      day: dayNames[currentDate.getDay()],
      date: currentDate.getDate().toString().padStart(2, '0'),
      month: monthNames[currentDate.getMonth()],
      fullDate: currentDate
    });
  }
  
  return dateList;
};

const timeSlots = [
  { time: '05:00', duration: '60 min', price: '200 sek' },
  { time: '05:30', duration: '90 min', price: '300 sek' },
  { time: '06:00', duration: '120 min', price: '400 sek' },
  { time: '06:30', duration: '60 min', price: '200 sek' },
  { time: '07:00', duration: '90 min', price: '300 sek' },
  { time: '07:30', duration: '120 min', price: '400 sek' },
  { time: '08:00', duration: '60 min', price: '200 sek' },
  { time: '08:30', duration: '90 min', price: '300 sek' },
  { time: '09:00', duration: '120 min', price: '400 sek' },
  { time: '09:30', duration: '60 min', price: '200 sek' },
  { time: '10:00', duration: '90 min', price: '300 sek' },
  { time: '10:30', duration: '120 min', price: '400 sek' },
  { time: '11:00', duration: '60 min', price: '200 sek' },
  { time: '11:30', duration: '90 min', price: '300 sek' },
  { time: '12:00', duration: '120 min', price: '400 sek' },
  { time: '12:30', duration: '60 min', price: '200 sek' },
  { time: '13:00', duration: '90 min', price: '300 sek' },
  { time: '13:30', duration: '120 min', price: '400 sek' },
  { time: '14:00', duration: '60 min', price: '200 sek' },
  { time: '14:30', duration: '90 min', price: '300 sek' },
  { time: '15:00', duration: '120 min', price: '400 sek' },
  { time: '15:30', duration: '60 min', price: '200 sek' },
  { time: '16:00', duration: '90 min', price: '300 sek' },
  { time: '16:30', duration: '120 min', price: '400 sek' },
  { time: '17:00', duration: '60 min', price: '200 sek' },
  { time: '17:30', duration: '90 min', price: '300 sek' },
  { time: '18:00', duration: '120 min', price: '400 sek' },
  { time: '18:30', duration: '60 min', price: '200 sek' },
  { time: '19:00', duration: '90 min', price: '300 sek' },
  { time: '19:30', duration: '120 min', price: '400 sek' },
  { time: '20:00', duration: '60 min', price: '200 sek' },
  { time: '20:30', duration: '90 min', price: '300 sek' },
  { time: '21:00', duration: '120 min', price: '400 sek' },
  { time: '21:30', duration: '60 min', price: '200 sek' },
  { time: '22:00', duration: '90 min', price: '300 sek' },
  { time: '22:30', duration: '120 min', price: '400 sek' },
  { time: '23:00', duration: '60 min', price: '200 sek' },
];

const carouselData = [
  {
    id: 1,
    title: 'PADELCENTER',
    subtitle: 'TROSA - VAGNHARAD',
    image: require('../../assets/images/carousel/1.png'),
  },
  {
    id: 2,
    title: 'PADELCENTER',
    subtitle: 'TROSA - VAGNHARAD',
    image: require('../../assets/images/carousel/2.png'),
  },
  // {
  //   id: 3,
  //   title: 'PADELCENTER',
  //   subtitle: 'TROSA - VAGNHARAD',
  //   image: require('../../assets/images/carousel/3.jpg'),
  // },
  // {
  //   id: 4,
  //   title: 'PADELCENTER',
  //   subtitle: 'TROSA - VAGNHARAD',
  //   image: require('../../assets/images/carousel/4.jpg'),
  // },
];

const courts = [
  {
    id: 1,
    name: 'Bana 1',
    type: 'Indoor | Double | Padel',
    slots: [
      { duration: '60 min', price: '200 sek', available: true },
      { duration: '90 min', price: '300 sek', available: true },
      { duration: '120 min', price: '400 sek', available: true },
    ]
  },
  {
    id: 2,
    name: 'Bana 2 Center Court',
    type: 'Indoor | Double | Padel',
    slots: [
      { duration: '60 min', price: '200 sek', available: true },
      { duration: '90 min', price: '300 sek', available: true },
      { duration: '120 min', price: '400 sek', available: true },
    ]
  },
  {
    id: 3,
    name: 'Bana 3 JONI CC',
    type: 'Indoor | Double | Padel',
    slots: [
      { duration: '60 min', price: '200 sek', available: true },
      { duration: '90 min', price: '300 sek', available: true },
      { duration: '120 min', price: '400 sek', available: true },
    ]
  },
  {
    id: 4,
    name: 'Bana 4',
    type: 'Indoor | Double | Padel',
    slots: [
      { duration: '60 min', price: '200 sek', available: true },
      { duration: '90 min', price: '300 sek', available: true },
      { duration: '120 min', price: '400 sek', available: true },
    ]
  },
];

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [activeTab, setActiveTab] = useState('Booking');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [showCourts, setShowCourts] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ court: number | null, slot: number | null }>({ court: null, slot: null });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPickerDate, setSelectedPickerDate] = useState(new Date());
  const [selectedPickerMonth, setSelectedPickerMonth] = useState<number | null>(null);
  const [selectedPickerYear, setSelectedPickerYear] = useState<number | null>(null);
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth());
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [dates, setDates] = useState<DateItem[]>(() => generateDateList(new Date()));
  const listRef = useRef<FlatList>(null);
  const carouselRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const renderCarouselItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.carouselSlide}>
      {/* Background Image */}
      <Image 
        source={item.image} 
        style={styles.carouselBackgroundImage}
        resizeMode="cover"
      />
    </View>
  );

  const navigateCarousel = (direction: 'prev' | 'next') => {
    const nextIndex = direction === 'next' 
      ? (currentCarouselIndex + 1) % carouselData.length
      : currentCarouselIndex === 0 ? carouselData.length - 1 : currentCarouselIndex - 1;
    
    setCurrentCarouselIndex(nextIndex);
    
    // Use scrollToOffset for more reliable scrolling
    const targetOffset = nextIndex * screenWidth;
    carouselRef.current?.scrollToOffset({ 
      offset: targetOffset, 
      animated: true 
    });
  };

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

  const renderAddDateItem = () => (
    <TouchableOpacity
      style={styles.addDateItem}
      onPress={() => {
        initializeDatePicker();
        setShowDatePicker(true);
      }}>
      <Ionicons name="add" size={32} color="#6C757D" />
    </TouchableOpacity>
  );

  const handleDatePickerChange = (day: number, isAdjacentMonth?: boolean, isNextMonth?: boolean) => {
    let targetMonth = pickerMonth;
    let targetYear = pickerYear;
    
    // Handle adjacent month navigation
    if (isAdjacentMonth) {
      if (isNextMonth) {
        // Next month day clicked
        if (pickerMonth === 11) {
          targetMonth = 0;
          targetYear = pickerYear + 1;
        } else {
          targetMonth = pickerMonth + 1;
        }
      } else {
        // Previous month day clicked
        if (pickerMonth === 0) {
          targetMonth = 11;
          targetYear = pickerYear - 1;
        } else {
          targetMonth = pickerMonth - 1;
        }
      }
      
      // Update the picker to show the target month
      setPickerMonth(targetMonth);
      setPickerYear(targetYear);
    }
    
    const selectedDate = new Date(targetYear, targetMonth, day);
    const formattedDay = day.toString().padStart(2, '0');
    
    // Update the selected date and month/year tracking
    setSelectedDate(formattedDay);
    setSelectedPickerMonth(targetMonth);
    setSelectedPickerYear(targetYear);
    
    // Generate new date list starting from selected date
    const newDates = generateDateList(selectedDate, 17);
    setDates(newDates);
    
    // Close the modal without resetting picker state
    setShowDatePicker(false);
  };

  // Generate dates for current month in calendar format
  const generateCalendarDates = () => {
    const today = new Date();
    const firstDay = new Date(pickerYear, pickerMonth, 1);
    const lastDay = new Date(pickerYear, pickerMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const calendarDates = [];
    
    // Add days from previous month
    if (startDayOfWeek > 0) {
      const prevMonth = pickerMonth === 0 ? 11 : pickerMonth - 1;
      const prevYear = pickerMonth === 0 ? pickerYear - 1 : pickerYear;
      const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
      
      for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const date = new Date(prevYear, prevMonth, day);
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        calendarDates.push({ 
          day: day.toString(), 
          disabled: isPast,
          isAdjacentMonth: true,
          isNextMonth: false
        });
      }
    }
    
    // Add all days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(pickerYear, pickerMonth, day);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      calendarDates.push({ 
        day: day.toString(), 
        disabled: isPast,
        isToday: day === today.getDate() && pickerMonth === today.getMonth() && pickerYear === today.getFullYear(),
        isAdjacentMonth: false,
        isNextMonth: false
      });
    }
    
    // Add days from next month to fill remaining spaces (up to 42 total for 6 weeks)
    const remainingCells = 42 - calendarDates.length;
    const nextMonth = pickerMonth === 11 ? 0 : pickerMonth + 1;
    const nextYear = pickerMonth === 11 ? pickerYear + 1 : pickerYear;
    
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(nextYear, nextMonth, day);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      calendarDates.push({ 
        day: day.toString(), 
        disabled: isPast,
        isAdjacentMonth: true,
        isNextMonth: true
      });
    }
    
    return calendarDates;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      if (pickerMonth === 11) {
        setPickerMonth(0);
        setPickerYear(pickerYear + 1);
      } else {
        setPickerMonth(pickerMonth + 1);
      }
    } else {
      if (pickerMonth === 0) {
        setPickerMonth(11);
        setPickerYear(pickerYear - 1);
      } else {
        setPickerMonth(pickerMonth - 1);
      }
    }
  };

  const resetDatePicker = () => {
    // Only reset the view to today's month, don't reset selection
    const today = new Date();
    setPickerMonth(today.getMonth());
    setPickerYear(today.getFullYear());
    // Don't reset selectedPickerMonth and selectedPickerYear here
  };

  const initializeDatePicker = () => {
    // If there's already a selected date, show that month
    if (selectedPickerMonth !== null && selectedPickerYear !== null) {
      setPickerMonth(selectedPickerMonth);
      setPickerYear(selectedPickerYear);
    } else {
      // Otherwise show today's month
      const today = new Date();
      setPickerMonth(today.getMonth());
      setPickerYear(today.getFullYear());
    }
  };

  const handleTimeSlotPress = (slot: any) => {
    setSelectedTime(slot.time);
    setShowCourts(true);
    
    // Scroll to courts section position (approximate position where courts start)
    setTimeout(() => {
      // Calculate approximate position: carousel(250) + header(90) + tabs(70) + dates(70) + timezone(50) + timeslots(400)
      const courtsPosition = 250 + 90 + 70 + 70 + 500 + 600;
      scrollViewRef.current?.scrollTo({ y: courtsPosition, animated: true });
    }, 100);
  };

  const handleCourtSlotPress = (courtId: number, slotIndex: number) => {
    setSelectedSlot({ court: courtId, slot: slotIndex });
  };

  const renderCourtItem = (court: any) => (
    <View key={court.id} style={styles.courtCard}>
      <Text style={styles.courtName}>{court.name}</Text>
      <Text style={styles.courtType}>{court.type}</Text>
      
      <View style={styles.slotsContainer}>
        {/* Top row - 2 slots */}
        <View style={styles.slotRow}>
          {court.slots.slice(0, 2).map((slot: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.courtSlot,
                slot.selected && styles.courtSlotSelected,
                !slot.available && styles.courtSlotUnavailable,
                (selectedSlot.court !== null && selectedSlot.slot !== null && selectedSlot.court === court.id && selectedSlot.slot === index) && styles.courtSlotActive
              ]}
              onPress={() => slot.available && handleCourtSlotPress(court.id, index)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.courtSlotText,
                slot.selected && styles.courtSlotTextSelected,
                (selectedSlot.court !== null && selectedSlot.slot !== null && selectedSlot.court === court.id && selectedSlot.slot === index) && styles.courtSlotTextActive
              ]}>
                {slot.duration}
              </Text>
              <Text style={[
                styles.courtSlotPrice,
                slot.selected && styles.courtSlotTextSelected,
                (selectedSlot.court !== null && selectedSlot.slot !== null && selectedSlot.court === court.id && selectedSlot.slot === index) && styles.courtSlotTextActive
              ]}>
                {slot.price}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Bottom row - 1 slot */}
        {court.slots.length > 2 && (
          <View style={styles.slotRow}>
            <TouchableOpacity
              style={[
                styles.courtSlot,
                styles.courtSlotSingle,
                court.slots[2].selected && styles.courtSlotSelected,
                !court.slots[2].available && styles.courtSlotUnavailable,
                (selectedSlot.court !== null && selectedSlot.slot !== null && selectedSlot.court === court.id && selectedSlot.slot === 2) && styles.courtSlotActive
              ]}
              onPress={() => court.slots[2].available && handleCourtSlotPress(court.id, 2)}
              disabled={!court.slots[2].available}
            >
              <Text style={[
                styles.courtSlotText,
                court.slots[2].selected && styles.courtSlotTextSelected,
                (selectedSlot.court !== null && selectedSlot.slot !== null && selectedSlot.court === court.id && selectedSlot.slot === 2) && styles.courtSlotTextActive
              ]}>
                {court.slots[2].duration}
              </Text>
              <Text style={[
                styles.courtSlotPrice,
                court.slots[2].selected && styles.courtSlotTextSelected,
                (selectedSlot.court !== null && selectedSlot.slot !== null && selectedSlot.court === court.id && selectedSlot.slot === 2) && styles.courtSlotTextActive
              ]}>
                {court.slots[2].price}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const hasBookingSelection = selectedTime && selectedSlot.court !== null && selectedSlot.slot !== null;

  const handleBookCourt = () => {
    if (hasBookingSelection) {
      const selectedCourt = courts.find(court => court.id === selectedSlot.court);
      const selectedSlotData = selectedCourt?.slots[selectedSlot.slot!];
      
      // Extract price number from price string (e.g., "400 sek" -> 400)
      const priceNumber = selectedSlotData?.price.match(/\d+/)?.[0] || '400';
      
      // Find the date info for the selected date
      const selectedDateInfo = dates.find((d: DateItem) => d.date === selectedDate);
      
      // Navigate to checkout page with booking details
      router.push({
        pathname: '/checkout',
        params: {
          date: `${selectedDateInfo?.day} ${selectedDate} ${selectedDateInfo?.month}`,
          time: selectedTime + '-' + getEndTime(selectedTime, selectedSlotData?.duration || '90 min'),
          court: selectedCourt?.name || 'Bana 4',
          type: selectedCourt?.type || 'Indoor | Double | Padel',
          price: priceNumber,
        }
      });
    }
  };

  // Helper function to calculate end time
  const getEndTime = (startTime: string, duration: string) => {
    const durationMinutes = parseInt(duration.match(/\d+/)?.[0] || '90');
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + durationMinutes;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* Fixed Top Navigation Overlay */}
      <View style={styles.topNavigation}>
        <TouchableOpacity 
          style={styles.topNavButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Hide the notifications icon */}
      </View>

      <ScrollView 
        style={styles.mainScrollView} 
        showsVerticalScrollIndicator={false} 
        ref={scrollViewRef}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 0,
        }}
        automaticallyAdjustContentInsets={false}
      >
        {/* Carousel Header */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={carouselRef}
            data={carouselData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCarouselItem}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={screenWidth}
            snapToAlignment="start"
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentCarouselIndex(index);
            }}
          />
          
          {/* Carousel Navigation Overlay - Now inside carousel container */}
          <View style={styles.carouselNavOverlay}>
            <TouchableOpacity 
              style={[styles.navButton, currentCarouselIndex > 0 ? styles.navButtonVisible : styles.navButtonHidden]} 
              onPress={() => navigateCarousel('prev')}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={32} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, currentCarouselIndex < carouselData.length - 1 ? styles.navButtonVisible : styles.navButtonHidden]} 
              onPress={() => navigateCarousel('next')}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-forward" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentCarouselIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Secondary Header with Logo and Favorite */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image 
                source={require('../../assets/images/padelcenter.png')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.facilityName}>Padelcenter trosa Vagnharad</Text>
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

        {/* Date Selection */}
        <View style={styles.dateSection}>
          <View style={styles.dateListWrapper}>
            <View style={styles.dateScrollContainer}>
              <FlatList
                ref={listRef}
                data={dates}
                horizontal
                keyExtractor={(item) => item.date}
                renderItem={renderDateItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateList}
                style={styles.flatListContainer}
              />
              {renderAddDateItem()}
            </View>
          </View>
        </View>

        {/* Time Zone Info */}
        <Text style={styles.timezoneText}>Central time zone: Europe/Stockholm</Text>

        {/* Time Slots Grid */}
        <View style={styles.timeSlotsContainer}>
          <View style={styles.slotGrid}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slotItem,
                  selectedTime === slot.time && styles.slotItemSelected,
                ]}
                onPress={() => handleTimeSlotPress(slot)}
              >
                <Text style={[
                  styles.slotTimeText,
                  selectedTime === slot.time && styles.slotTimeTextSelected,
                ]}>
                  {slot.time}
                </Text>
                <View style={styles.slotInfoRow}>
                  <Text style={[
                    styles.slotDurationText,
                    selectedTime === slot.time && styles.slotDurationTextSelected,
                  ]}>
                    {slot.duration}
                  </Text>
                  <Text style={[
                    styles.slotSeparator,
                    selectedTime === slot.time && styles.slotSeparatorSelected,
                  ]}>
                    |
                  </Text>
                  <Text style={[
                    styles.slotPriceText,
                    selectedTime === slot.time && styles.slotPriceTextSelected,
                  ]}>
                    {slot.price}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Courts Section - Shows when time slot is selected */}
        {showCourts && (
          <View style={styles.courtsSection}>
            <Text style={styles.sectionTitle}>Available Courts for {selectedTime}</Text>
            {courts.map(renderCourtItem)}
          </View>
        )}

        {/* Bottom Padding for Booking Button */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Fixed Booking Button */}
      {hasBookingSelection && (
        <View style={styles.bookingButtonContainer}>
          <TouchableOpacity 
            style={styles.bookingButton}
            onPress={handleBookCourt}
            activeOpacity={0.8}
          >
            <Text style={styles.bookingButtonText}>Book Court</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Date</Text>
              
              {/* Month/Year Header with Navigation */}
              <View style={styles.monthNavigationContainer}>
                <TouchableOpacity 
                  style={styles.monthNavButton}
                  onPress={() => navigateMonth('prev')}
                >
                  <Ionicons name="chevron-back" size={24} color="#2C3E50" />
                </TouchableOpacity>
                
                <Text style={styles.monthYearText}>
                  {new Date(pickerYear, pickerMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                
                <TouchableOpacity 
                  style={styles.monthNavButton}
                  onPress={() => navigateMonth('next')}
                >
                  <Ionicons name="chevron-forward" size={24} color="#2C3E50" />
                </TouchableOpacity>
              </View>
              
              {/* Day Names Header */}
              <View style={styles.dayNamesContainer}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
                  <Text key={dayName} style={styles.dayNameText}>{dayName}</Text>
                ))}
              </View>
              
              <View style={styles.datePickerGrid}>
                {generateCalendarDates().map((dateItem, index) => {
                  const isSelected = dateItem.day && !dateItem.isAdjacentMonth && 
                    selectedDate === dateItem.day.padStart(2, '0') && 
                    selectedPickerMonth === pickerMonth && 
                    selectedPickerYear === pickerYear;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.datePickerItem,
                        dateItem.disabled && styles.datePickerItemDisabled,
                        dateItem.isAdjacentMonth && styles.datePickerItemAdjacent,
                        dateItem.isToday && !isSelected && styles.datePickerItemToday,
                        isSelected && styles.datePickerItemSelected
                      ]}
                      onPress={() => {
                        if (dateItem.isAdjacentMonth) {
                          handleDatePickerChange(parseInt(dateItem.day), true, dateItem.isNextMonth);
                        } else if (!dateItem.disabled && dateItem.day) {
                          handleDatePickerChange(parseInt(dateItem.day));
                        }
                      }}
                      disabled={dateItem.disabled || !dateItem.day}
                    >
                      <Text style={[
                        styles.datePickerText,
                        dateItem.disabled && styles.datePickerTextDisabled,
                        dateItem.isAdjacentMonth && styles.datePickerTextAdjacent,
                        dateItem.isToday && !isSelected && styles.datePickerTextToday,
                        isSelected && styles.datePickerTextSelected
                      ]}>
                        {dateItem.day || ''}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              
              <TouchableOpacity 
                style={styles.modalCloseButton}
                onPress={() => {
                  setShowDatePicker(false);
                  // Don't reset picker state, preserve selection
                }}
              >
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0,
  },
  mainScrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F0F0F0',
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
    gap: 6,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tabButton: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    minWidth: 60,
    flexShrink: 1,
  },
  tabButtonActive: {
    backgroundColor: '#00E8B1',
  },
  tabText: {
    fontSize: 13,
    color: '#6C757D',
    fontWeight: '500',
    textAlign: 'center',
    flexShrink: 1,
  },
  tabTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  dateSection: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    borderTopRightRadius: 35,
    marginLeft: 20,
  },
  dateListWrapper: {
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    overflow: 'hidden',
  },
  dateScrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateList: {
    // paddingHorizontal: 20,
    // gap: 12,
  },
  flatListContainer: {
    flexGrow: 0,
  },
  dateItem: {
    width: 70,
    height: 70,
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  selectedDate: {
    backgroundColor: '#00E8B1',
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
  },
  addDateItem: {
    width: 70,
    height: 70,
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderStyle: 'dashed',
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
    color: '#000',
  },
  timezoneText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#ADB5BD',
    marginRight: 20,
    marginVertical: 16,
  },
  timeSlotsContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  slotGrid: {
    width: screenWidth,
    flexDirection: 'row',
    paddingRight: 30,
    flexWrap: 'wrap',
    gap: 8,
  },
  slotItem: {
    width: '31%',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // paddingVertical: 6,
    // paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  slotItemSelected: {
    backgroundColor: '#00E8B1',
  },
  slotTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  slotTimeTextSelected: {
    color: '#000',
  },
  slotDurationText: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  slotDurationTextSelected: {
    color: '#000',
  },
  slotPriceText: {
    fontSize: 11,
    color: '#7F8C8D',
  },
  slotPriceTextSelected: {
    color: '#000',
  },
  slotInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotSeparator: {
    fontSize: 11,
    color: '#7F8C8D',
    marginHorizontal: 4,
  },
  slotSeparatorSelected: {
    color: '#000',
  },
  carouselContainer: {
    height: 250,
    position: 'relative',
  },
  carouselSlide: {
    width: screenWidth,
    height: 250,
    position: 'relative',
  },
  carouselBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    height: 250,
  },
  topNavigation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    zIndex: 10,
  },
  topNavButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(0,0,139,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  carouselNavOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 9,
    height: 250,
  },
  navButton: {
    padding: 20,
    borderRadius: 30,
    backgroundColor: 'transparent',
    elevation: 3,
  },
  navButtonVisible: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
  },
  navButtonHidden: {
    backgroundColor: 'transparent',
    opacity: 0.5,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#00E8B1',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  courtCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  courtName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  courtType: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 16,
  },
  slotsContainer: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 8,
  },
  slotRow: {
    flexDirection: 'row',
    gap: 12,
  },
  courtSlot: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  courtSlotSelected: {
    backgroundColor: '#00E8B1',
    borderColor: '#00E8B1',
  },
  courtSlotUnavailable: {
    backgroundColor: '#F0F0F0',
    opacity: 0.6,
  },
  courtSlotActive: {
    backgroundColor: '#00E8B1',
    borderColor: '#00E8B1',
  },
  courtSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  courtSlotTextSelected: {
    color: '#000',
  },
  courtSlotTextActive: {
    color: '#000',
  },
  courtSlotPrice: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  courtsSection: {
    padding: 20,
    backgroundColor: '#F0F0F0',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  courtSlotSingle: {
    width: '48%',
  },
  bottomPadding: {
    height: 100,
  },
  bookingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  bookingButton: {
    backgroundColor: '#00E8B1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  modalCloseText: {
    color: '#2C3E50',
    fontSize: 16,
    fontWeight: '600',
  },
  datePickerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 300,
  },
  datePickerItem: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  datePickerItemSelected: {
    backgroundColor: '#00E8B1',
  },
  datePickerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  datePickerTextSelected: {
    color: '#000',
  },
  monthNavigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: 300,
  },
  monthNavButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E50',
    textAlign: 'center',
    minWidth: 180,
  },
  dayNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: 300,
  },
  dayNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    width: 38,
    textAlign: 'center',
  },
  datePickerItemDisabled: {
    backgroundColor: '#F0F0F0',
    opacity: 0.5,
  },
  datePickerItemToday: {
    backgroundColor: '#00E8B1',
  },
  datePickerTextDisabled: {
    color: '#7F8C8D',
  },
  datePickerTextToday: {
    color: '#000',
  },
  datePickerItemAdjacent: {
    backgroundColor: '#F8F9FA',
    opacity: 0.6,
  },
  datePickerTextAdjacent: {
    color: '#ADB5BD',
    fontSize: 13,
  },
});
