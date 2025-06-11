import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Theme type definition
type Theme = 'inline' | 'outline';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(12);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState('August');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(7);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(90);
  // Add theme state
  const [currentTheme, setCurrentTheme] = useState<Theme>('inline');
  // Add payment modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Apple pay');

  // Separate state for the base date that generates the circular date list
  const [baseDateForList, setBaseDateForList] = useState(12);

  // Ref for main ScrollView
  const mainScrollRef = useRef<ScrollView>(null);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Create array of dates for scrollable list - now dynamic based on baseDateForList
  const generateDates = (startDate: number) => {
    const dates = [];
    const maxDaysInMonth = getDaysInMonth(calendarDate);

    for (let i = 0; i < 15; i++) {
      const currentDate = startDate + i;
      if (currentDate <= maxDaysInMonth) {
        dates.push(currentDate);
      } else {
        break; // Stop if we exceed the month's maximum days
      }
    }
    return dates;
  };

  const dates = generateDates(baseDateForList);

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(calendarDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCalendarDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(calendarDate);
    const firstDay = getFirstDayOfMonth(calendarDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.calendarDay} />
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedCalendarDate;
      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.calendarDay, isSelected && styles.selectedCalendarDay]}
          onPress={() => {
            setSelectedCalendarDate(day);
            // Update selectedDate and regenerate the dates array
            setSelectedDate(day);
            setBaseDateForList(day);
          }}
        >
          <Text style={[styles.calendarDayText, isSelected && styles.selectedCalendarDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setPickerDate(selectedDate);
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      setSelectedMonth(monthNames[selectedDate.getMonth()]);
    }
  };

  const openDatePicker = () => {
    setSelectedCalendarDate(selectedDate);
    setShowDatePicker(true);
  };

  const handleConfirmDate = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    setSelectedMonth(monthNames[calendarDate.getMonth()]);
    // selectedDate is already updated in renderCalendarDays, so dates array will automatically update
    setShowDatePicker(false);
  };

  // Time slots data
  const timeSlots = [
    '05:30', '06:00', '06:30',
    '07:00', '07:30', '08:00',
    '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00',
    '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00',
    '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00',
    '18:00', '18:30', '19:00',
    '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00',
    '22:30', '23:00'
  ];

  const durations = [60, 90, 120];

  const getDayName = (date: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), date);
    return days[currentDate.getDay()];
  };

  const getFormattedDate = (date: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${getDayName(date)} ${date} ${months[calendarDate.getMonth()]}`;
  };

  const handleTimeSlotPress = (time: string) => {
    setSelectedTimeSlot(time);
    setShowBookingDetails(true);
    // Scroll to booking details section with delay to ensure state updates
    setTimeout(() => {
      // Scroll to approximately where the booking details container starts
      // This is after the time slots section
      mainScrollRef.current?.scrollTo({ y: 1400, animated: true });
    }, 100);
  };

  const handleDateButtonPress = (date: number) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
    // Scroll to time slots section with delay to ensure state updates
    setTimeout(() => {
      // Scroll to approximately where the time slots section starts
      // This is roughly after the header, greeting, bookings, and reserve sections
      mainScrollRef.current?.scrollTo({ y: 900, animated: true });
    }, 100);
  };

  // Theme toggle function
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === 'inline' ? 'outline' : 'inline');
  };

  // Open payment modal function
  const openPaymentModal = () => {
    setShowPaymentModal(true);
  };

  // Get current price based on selected duration
  const getCurrentPrice = () => {
    switch (selectedDuration) {
      case 60:
        return '36,00 €';
      case 90:
        return '54,00 €';
      case 120:
        return '72,00 €';
      default:
        return '54,00 €';
    }
  };

  // Get formatted booking date and time
  const getBookingDateTime = () => {
    if (!selectedTimeSlot) return 'Please select a time slot';

    const endTime = calculateEndTime(selectedTimeSlot, selectedDuration);
    return `${getFormattedDate(selectedDate)}, ${selectedTimeSlot}-${endTime}`;
  };

  // Calculate end time based on start time and duration
  const calculateEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  // Get venue information
  const getVenueInfo = () => {
    return {
      name: 'Moon play Arena',
      address: 'Koncfuku g. 214, Vievis'
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Main Scrollable Content */}
      <ScrollView
        ref={mainScrollRef}
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Background Image - now inside ScrollView */}
        <Image
          source={require('../../assets/images/image.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={require('../../assets/images/icon.png')}
              style={styles.profileImage}
            />
          </View>
          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[
              styles.themeToggleButton,
              currentTheme === 'outline' && styles.themeToggleButtonOutline
            ]}
            onPress={toggleTheme}
          >
            <Text style={[
              styles.themeToggleText,
              currentTheme === 'outline' && styles.themeToggleTextOutline
            ]}>
              {currentTheme === 'inline' ? '○' : '●'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={styles.helloText}>Hello 👋</Text>
            <Text style={styles.nameText}>Emy Wilson</Text>
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>⭐ 8.5 Tennis Game level</Text>
            </View>
          </View>

          {/* Booking Section */}
          <View style={styles.bookingSection}>
            <Text style={styles.bookingsTitle}>Your Bookings</Text>

            {/* Booking Cards */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookingCards}
            >
              <View style={[
                styles.bookingCard,
                currentTheme === 'outline' && styles.bookingCardOutline
              ]}>
                <View style={styles.cardIcon}>
                  <Image
                    source={require('../../assets/images/ball-icon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={[
                    styles.venueName,
                    currentTheme === 'outline' && styles.venueNameOutline
                  ]}>Flushing<br />Meadows</Text>
                  <Text style={[
                    styles.bookingTime,
                    currentTheme === 'outline' && styles.bookingTimeOutline
                  ]}>Sat 21 oct, 14:00-16:00</Text>
                </View>
              </View>

              <View style={[
                styles.bookingCard,
                currentTheme === 'outline' && styles.bookingCardOutline
              ]}>
                <View style={styles.cardIcon}>
                  <Image
                    source={require('../../assets/images/ball-icon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={[
                    styles.venueName,
                    currentTheme === 'outline' && styles.venueNameOutline
                  ]}>Gran Slam<br />Grass</Text>
                  <Text style={[
                    styles.bookingTime,
                    currentTheme === 'outline' && styles.bookingTimeOutline
                  ]}>Sat 21 oct, 14:00-16:00</Text>
                </View>
              </View>

              <View style={[
                styles.bookingCard,
                currentTheme === 'outline' && styles.bookingCardOutline
              ]}>
                <View style={styles.cardIcon}>
                  <Image
                    source={require('../../assets/images/ball-icon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={[
                    styles.venueName,
                    currentTheme === 'outline' && styles.venueNameOutline
                  ]}>Wimbledon<br />Grass</Text>
                  <Text style={[
                    styles.bookingTime,
                    currentTheme === 'outline' && styles.bookingTimeOutline
                  ]}>Sun 22 oct, 10:00-12:00</Text>
                </View>
              </View>

              <View style={[
                styles.bookingCard,
                currentTheme === 'outline' && styles.bookingCardOutline
              ]}>
                <View style={styles.cardIcon}>
                  <Image
                    source={require('../../assets/images/ball-icon.png')}
                    style={styles.iconImage}
                  />
                </View>
                <View style={styles.cardContent}>
                  <Text style={[
                    styles.venueName,
                    currentTheme === 'outline' && styles.venueNameOutline
                  ]}>Roland<br />Clay</Text>
                  <Text style={[
                    styles.bookingTime,
                    currentTheme === 'outline' && styles.bookingTimeOutline
                  ]}>Mon 23 oct, 16:00-18:00</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          {/* Reserve Section */}
          <View style={styles.reserveSection}>
            <Text style={styles.reserveText}>Reserve your</Text>
            <Text style={styles.courtText}>Tennis court</Text>

            {/* Date Selection Card */}
            <View style={[
              styles.dateSelectionCard,
              currentTheme === 'outline' && styles.dateSelectionCardOutline
            ]}>
              <Text style={[
                styles.selectionText,
                currentTheme === 'outline' && styles.selectionTextOutline
              ]}>
                Selecting the days available in{''}
                <TouchableOpacity onPress={openDatePicker} style={styles.monthButton}>
                  <Text style={styles.highlightText}>{selectedMonth}</Text>
                </TouchableOpacity>
                at <Text style={styles.venueNameText}>Moon arena</Text>
              </Text>

              {/* Date Buttons */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateButtonsContainer}
              >
                {dates.map((date) => (
                  <TouchableOpacity
                    key={date}
                    style={[
                      styles.circularDateButton,
                      currentTheme === 'outline' && styles.circularDateButtonOutline,
                      selectedDate === date && currentTheme === 'outline' && styles.selectedCircularDateButtonOutline
                    ]}
                    onPress={() => handleDateButtonPress(date)}
                  >
                    {selectedDate === date && currentTheme === 'inline' && (
                      <Image
                        source={require('../../assets/images/datebutton.png')}
                        style={styles.selectedDateImage}
                      />
                    )}
                    {currentTheme === 'outline' ? (
                      <View style={styles.dateButtonContentOutline}>
                        <Text style={styles.monthTextOutline}>
                          {monthNames[calendarDate.getMonth()]}
                        </Text>
                        <Text style={[
                          styles.dateNumberOutline,
                          selectedDate === date && styles.selectedDateNumberOutline
                        ]}>
                          {date}
                        </Text>
                        <Text style={styles.dayNameOutline}>
                          {getDayName(date)}
                        </Text>
                        {selectedDate === date && (
                          <View style={styles.selectedIndicatorOutline} />
                        )}
                      </View>
                    ) : (
                      <Text style={[
                        styles.circularDateText,
                        selectedDate === date && styles.selectedDateText
                      ]}>{date}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Booking Now Button */}
              <TouchableOpacity style={[
                styles.bookingButton,
                currentTheme === 'outline' && styles.bookingButtonOutline
              ]}>
                <Image
                  source={require('../../assets/images/padel.png')}
                  style={styles.bookingButtonIcon}
                />
                <Text style={[
                  styles.bookingButtonText,
                  currentTheme === 'outline' && styles.bookingButtonTextOutline
                ]}>Booking Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Time Slots Section - appears when showTimeSlots is true */}
          {showTimeSlots && (
            <View style={[
              styles.timeSlotsInlineContainer,
              currentTheme === 'outline' && styles.timeSlotsInlineContainerOutline
            ]}>
              {/* Header */}
              <View style={styles.timeSlotsInlineHeader}>
                <Text style={[
                  styles.timeSlotsInlineTitle,
                  currentTheme === 'outline' && styles.timeSlotsInlineTitleOutline
                ]}>{getFormattedDate(selectedDate)}</Text>
              </View>

              {/* Time Slots Grid */}
              <View style={styles.timeSlotsInlineGrid}>
                {timeSlots.map((time, index) => {
                  const isSelected = selectedTimeSlot === time;
                  return (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlotCard,
                        currentTheme === 'outline' && styles.timeSlotCardOutline,
                        isSelected && styles.selectedTimeSlotCard,
                        isSelected && currentTheme === 'outline' && styles.selectedTimeSlotCardOutline
                      ]}
                      onPress={() => handleTimeSlotPress(time)}
                    >
                      <Text style={[
                        styles.timeSlotTime,
                        currentTheme === 'outline' && styles.timeSlotTimeOutline,
                        isSelected && styles.selectedTimeSlotTime,
                        isSelected && currentTheme === 'outline' && styles.selectedTimeSlotTimeOutline
                      ]}>
                        {time}
                      </Text>
                      <Text style={[
                        styles.durationText,
                        currentTheme === 'outline' && styles.durationTextOutline,
                        isSelected && styles.selectedDurationText,
                        isSelected && currentTheme === 'outline' && styles.selectedDurationTextOutline
                      ]}>
                        60 | 90 | 120
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* Booking Details Section - appears when showBookingDetails is true */}
          {showBookingDetails && (
            <>
              {/* Price Options Container */}
              <View style={[
                styles.priceOptionsContainer,
                currentTheme === 'outline' && styles.priceOptionsContainerOutline
              ]}>
                {/* Arena Info */}
                <View style={styles.arenaInfoInline}>
                  <Text style={[
                    styles.arenaTitleInline,
                    currentTheme === 'outline' && styles.arenaTitleInlineOutline
                  ]}>Moon play Arena</Text>
                  <Text style={[
                    styles.arenaLocationInline,
                    currentTheme === 'outline' && styles.arenaLocationInlineOutline
                  ]}>Koncfulig g. 214, Vilnius</Text>
                </View>

                {/* Price Options */}
                <View style={styles.priceOptionsInlineContainer}>
                  <TouchableOpacity
                    style={[
                      styles.priceOptionInline,
                      currentTheme === 'outline' && styles.priceOptionInlineOutline,
                      selectedDuration === 60 && styles.selectedPriceOptionInline,
                      selectedDuration === 60 && currentTheme === 'outline' && styles.selectedPriceOptionInlineOutline
                    ]}
                    onPress={() => setSelectedDuration(60)}
                  >
                    <Text style={[
                      styles.priceAmountInline,
                      currentTheme === 'outline' && styles.priceAmountInlineOutline,
                      selectedDuration === 60 && styles.selectedPriceAmountInline,
                      selectedDuration === 60 && currentTheme === 'outline' && styles.selectedPriceAmountInlineOutline
                    ]}>36.00 €</Text>
                    <Text style={[
                      styles.priceDurationInline,
                      currentTheme === 'outline' && styles.priceDurationInlineOutline,
                      selectedDuration === 60 && styles.selectedPriceDurationInline,
                      selectedDuration === 60 && currentTheme === 'outline' && styles.selectedPriceDurationInlineOutline
                    ]}>60 min</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.priceOptionInline,
                      currentTheme === 'outline' && styles.priceOptionInlineOutline,
                      selectedDuration === 90 && styles.selectedPriceOptionInline,
                      selectedDuration === 90 && currentTheme === 'outline' && styles.selectedPriceOptionInlineOutline
                    ]}
                    onPress={() => setSelectedDuration(90)}
                  >
                    <Text style={[
                      styles.priceAmountInline,
                      currentTheme === 'outline' && styles.priceAmountInlineOutline,
                      selectedDuration === 90 && styles.selectedPriceAmountInline,
                      selectedDuration === 90 && currentTheme === 'outline' && styles.selectedPriceAmountInlineOutline
                    ]}>54.00 €</Text>
                    <Text style={[
                      styles.priceDurationInline,
                      currentTheme === 'outline' && styles.priceDurationInlineOutline,
                      selectedDuration === 90 && styles.selectedPriceDurationInline,
                      selectedDuration === 90 && currentTheme === 'outline' && styles.selectedPriceDurationInlineOutline
                    ]}>90 min</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.priceOptionInline,
                      currentTheme === 'outline' && styles.priceOptionInlineOutline,
                      selectedDuration === 120 && styles.selectedPriceOptionInline,
                      selectedDuration === 120 && currentTheme === 'outline' && styles.selectedPriceOptionInlineOutline
                    ]}
                    onPress={() => setSelectedDuration(120)}
                  >
                    <Text style={[
                      styles.priceAmountInline,
                      currentTheme === 'outline' && styles.priceAmountInlineOutline,
                      selectedDuration === 120 && styles.selectedPriceAmountInline,
                      selectedDuration === 120 && currentTheme === 'outline' && styles.selectedPriceAmountInlineOutline
                    ]}>72.00 €</Text>
                    <Text style={[
                      styles.priceDurationInline,
                      currentTheme === 'outline' && styles.priceDurationInlineOutline,
                      selectedDuration === 120 && styles.selectedPriceDurationInline,
                      selectedDuration === 120 && currentTheme === 'outline' && styles.selectedPriceDurationInlineOutline
                    ]}>120 min</Text>
                  </TouchableOpacity>
                </View>

                {/* Time Slot Info */}
                <View style={styles.timeSlotInfoInline}>
                  <Text style={[
                    styles.selectedTimeTextInline,
                    currentTheme === 'outline' && styles.selectedTimeTextInlineOutline
                  ]}>
                    Selected time: {selectedTimeSlot} - {getFormattedDate(selectedDate)}
                  </Text>
                </View>
              </View>

              {/* Payment Selection Container */}
              <View style={[
                styles.paymentSelectionContainer,
                currentTheme === 'outline' && styles.paymentSelectionContainerOutline
              ]}>
                {/* Payment Method */}
                <View style={styles.paymentMethodContainer}>
                  <Text style={[
                    styles.paymentMethodText,
                    currentTheme === 'outline' && styles.paymentMethodTextOutline
                  ]}>
                    Your default payment is{''}
                    <TouchableOpacity onPress={openPaymentModal} style={styles.applePayButton}>
                      <Text style={styles.applePayText}>{selectedPaymentMethod}</Text>
                    </TouchableOpacity>.
                  </Text>
                </View>

                {/* Booking Button */}
                <TouchableOpacity style={[
                  styles.finalBookingButton,
                  currentTheme === 'outline' && styles.finalBookingButtonOutline
                ]}>
                  <View style={styles.bookingButtonContent}>
                    <Image
                      source={require('../../assets/images/padel.png')}
                      style={styles.finalBookingButtonIcon}
                    />
                    <Text style={[
                      styles.finalBookingButtonText,
                      currentTheme === 'outline' && styles.finalBookingButtonTextOutline
                    ]}>Booking Now</Text>
                  </View>
                </TouchableOpacity>

                {/* Terms Text */}
                <Text style={[
                  styles.termsText,
                  currentTheme === 'outline' && styles.termsTextOutline
                ]}>
                  By clicking "Book court" you agree with our terms and policy.
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDatePicker}
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Date</Text>

              {/* Month Navigation */}
              <View style={styles.monthNavigation}>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => navigateMonth('prev')}
                >
                  <Text style={styles.navButtonText}>‹</Text>
                </TouchableOpacity>

                <Text style={styles.monthYearText}>
                  {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                </Text>

                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => navigateMonth('next')}
                >
                  <Text style={styles.navButtonText}>›</Text>
                </TouchableOpacity>
              </View>

              {/* Days of Week Header */}
              <View style={styles.daysHeader}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Text key={day} style={styles.dayHeaderText}>{day}</Text>
                ))}
              </View>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {renderCalendarDays()}
              </View>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Payment Selection Modal */}
      {showPaymentModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showPaymentModal}
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View style={styles.paymentModalOverlay}>
            <View style={styles.paymentModalContent}>
              {/* Header */}
              <View style={styles.paymentModalHeader}>
                <Text style={styles.paymentModalTitle}>Payment Selection</Text>
                <TouchableOpacity
                  style={styles.paymentModalCloseButton}
                  onPress={() => setShowPaymentModal(false)}
                >
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Booking Details */}
              <View style={styles.paymentBookingDetails}>
                <View style={styles.paymentBookingIcon}>
                  <Image
                    source={require('../../assets/images/ball-icon.png')}
                    style={styles.paymentBookingIconImage}
                  />
                </View>
                <View style={styles.paymentBookingInfo}>
                  <Text style={styles.paymentBookingDate}>
                    {getBookingDateTime()}
                  </Text>
                  <Text style={styles.paymentBookingVenue}>
                    {getVenueInfo().name}
                  </Text>
                  <Text style={styles.paymentBookingAddress}>
                    {getVenueInfo().address}
                  </Text>
                </View>
              </View>

              {/* Payment Methods */}
              <View style={styles.paymentMethodsList}>
                <TouchableOpacity
                  style={styles.paymentMethodItem}
                  onPress={() => setSelectedPaymentMethod('Apple pay')}
                >
                  <View style={styles.paymentMethodLeft}>
                    <View style={[
                      styles.paymentMethodRadio,
                      selectedPaymentMethod === 'Apple pay' && styles.paymentMethodRadioSelected
                    ]}>
                      {selectedPaymentMethod === 'Apple pay' && (
                        <View style={styles.paymentMethodRadioInner} />
                      )}
                    </View>
                    <Text style={styles.paymentMethodName}>Apple pay</Text>
                  </View>
                  <Text style={styles.paymentMethodPrice}>{getCurrentPrice()}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.paymentMethodItem}
                  onPress={() => setSelectedPaymentMethod('Bank link')}
                >
                  <View style={styles.paymentMethodLeft}>
                    <View style={[
                      styles.paymentMethodRadio,
                      selectedPaymentMethod === 'Bank link' && styles.paymentMethodRadioSelected
                    ]}>
                      {selectedPaymentMethod === 'Bank link' && (
                        <View style={styles.paymentMethodRadioInner} />
                      )}
                    </View>
                    <Text style={styles.paymentMethodName}>Bank link</Text>
                    <TouchableOpacity style={styles.infoButton}>
                      <Ionicons name="help-circle" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.paymentMethodPrice}>{getCurrentPrice()}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.paymentMethodItem}
                  onPress={() => setSelectedPaymentMethod('Credit card')}
                >
                  <View style={styles.paymentMethodLeft}>
                    <View style={[
                      styles.paymentMethodRadio,
                      selectedPaymentMethod === 'Credit card' && styles.paymentMethodRadioSelected
                    ]}>
                      {selectedPaymentMethod === 'Credit card' && (
                        <View style={styles.paymentMethodRadioInner} />
                      )}
                    </View>
                    <Text style={styles.paymentMethodName}>Credit card</Text>
                    <TouchableOpacity style={styles.infoButton}>
                      <Ionicons name="help-circle" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.paymentMethodPrice}>{getCurrentPrice()}</Text>
                </TouchableOpacity>

                {/* Add Payment Method Button */}
                {/* <TouchableOpacity style={styles.addPaymentMethodButton}>
                  <Text style={styles.addPaymentMethodText}>+</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={styles.expandableSection}
                >
                  <Ionicons
                    name={"add"}
                    size={24}
                    color="#000"
                  />
                </TouchableOpacity>
              </View>

              {/* Go to Payment Button */}
              <TouchableOpacity style={styles.goToPaymentButton}>
                <Text style={styles.goToPaymentButtonText}>Go to payment</Text>
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
    backgroundColor: '#1a4d6b',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.8,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginRight: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  timeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuButton: {
    padding: 10,
  },
  menuDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 20,
    height: 20,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    margin: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  greetingSection: {
    marginBottom: 40,
  },
  helloText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    // marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
  },
  nameText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 20,
  },
  levelContainer: {
    alignSelf: 'flex-start',
  },
  levelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
    marginLeft: 20,
  },
  graphicsContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tennisBall: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#9ed82b',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  ballInner: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  ballCurve1: {
    position: 'absolute',
    top: 20,
    left: -10,
    right: -10,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
    transform: [{ rotate: '-15deg' }],
  },
  ballCurve2: {
    position: 'absolute',
    bottom: 20,
    left: -10,
    right: -10,
    height: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
    transform: [{ rotate: '15deg' }],
  },
  racketContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    transform: [{ rotate: '15deg' }],
  },
  racketHead: {
    width: 80,
    height: 100,
    borderWidth: 6,
    borderColor: '#BEBCBE',
    borderRadius: 40,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  racketStrings: {
    flex: 1,
    position: 'relative',
  },
  stringVertical: {
    position: 'absolute',
    top: 8,
    bottom: 8,
    width: 1,
    backgroundColor: '#fff',
    opacity: 0.6,
  },
  stringHorizontal: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.6,
  },
  racketHandle: {
    width: 12,
    height: 60,
    backgroundColor: '#8B4513',
    alignSelf: 'center',
    borderRadius: 6,
    marginTop: -5,
  },
  bookingSection: {
    paddingBottom: 40,
    marginLeft: 20,
    marginTop: 90,
  },
  bookingsTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '600',
    marginBottom: 20,
  },
  bookingCards: {
    // paddingHorizontal: 20,
    marginLeft: 20,
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 24,
    height: 90,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingCardOutline: {
    backgroundColor: '#fff',
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  venueName: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  venueNameOutline: {
    color: '#333',
  },
  bookingTime: {
    color: '#666',
    fontSize: 12,
    fontWeight: '400',
  },
  bookingTimeOutline: {
    color: '#666',
  },
  iconImage: {
    width: 32,
    height: 32,
    marginBottom: 20,
    marginRight: -10,
  },
  reserveSection: {
    paddingLeft: 40,
    paddingTop: 0,
  },
  reserveText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 5,
  },
  courtText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateSelectionCard: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 20,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateSelectionCardOutline: {
    backgroundColor: '#fff',
  },
  selectionText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
  },
  selectionTextOutline: {
    color: '#333',
  },
  venueText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 20,
  },
  venueNameText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  dateButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
    // paddingHorizontal: 20,
  },
  circularDateButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderColor: '#BEBCBE',
    borderWidth: 1,
    marginHorizontal: 8,
  },
  circularDateButtonOutline: {
    backgroundColor: '#fff',
    width: 47,
    height: 89,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  highlightText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '500',
  },
  circularDateText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  circularDateTextOutline: {
    color: '#333',
  },
  selectedDateImage: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  bookingButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#131111',
    // paddingHorizontal: 20,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 20,
  },
  bookingButtonOutline: {
    backgroundColor: '#131111',
  },
  bookingButtonIcon: {
    width: 50,
    height: 50,
    left: 10,
    marginRight: 30,
  },
  bookingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 90,
  },
  bookingButtonTextOutline: {
    color: '#fff',
  },
  selectedDateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedDateTextOutline: {
    color: '#0149BA',
  },
  monthButton: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  navButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  daysHeader: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 15,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 30,
  },
  calendarDay: {
    width: '14.28%',
    height: 41.44,
    borderRadius: 22.5,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  selectedCalendarDay: {
    backgroundColor: '#4A90E2',
  },
  calendarDayText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedCalendarDayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  timeSlotsInlineContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeSlotsInlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  inlineBackButton: {
    padding: 5,
  },
  inlineBackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  timeSlotsInlineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  timeSlotsInlineTitleOutline: {
    color: '#333',
  },
  timeSlotsInlineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotCard: {
    width: '31%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BEBCBE',
    height: 60,
  },
  timeSlotCardOutline: {
    backgroundColor: '#fff',
  },
  timeSlotTime: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginTop: -2,
    marginBottom: 2
  },
  timeSlotTimeOutline: {
    color: '#333',
  },
  durationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  durationButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    minWidth: 35,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  selectedDurationButton: {
    backgroundColor: '#4A90E2',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  durationText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  durationTextOutline: {
    color: '#999',
  },
  selectedDurationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  selectedDurationTextOutline: {
    color: '#0149BA',
    marginBottom: 3
  },
  selectedTimeSlotCard: {
    backgroundColor: '#0149BA',
  },
  selectedTimeSlotCardOutline: {
    backgroundColor: '#fff',
    borderColor: '#0149BA',
    borderWidth: 3,
    top: -1
  },
  selectedTimeSlotTime: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectedTimeSlotTimeOutline: {
    color: '#0149BA',
    marginTop: -3
  },
  bookingDetailsContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  arenaInfoInline: {
    marginBottom: 20,
  },
  arenaTitleInline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  arenaLocationInline: {
    color: '#666',
    fontSize: 14,
    fontWeight: '400',
  },
  priceOptionsInlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  priceOptionInline: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BEBCBE',
    width: 100,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedPriceOptionInline: {
    backgroundColor: '#0149BA',
  },
  priceAmountInline: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  selectedPriceAmountInline: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  priceDurationInline: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  selectedPriceDurationInline: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  timeSlotInfoInline: {
    marginBottom: 20,
  },
  selectedTimeTextInline: {
    color: '#333',
    fontSize: 14,
    fontWeight: '400',
  },
  paymentMethodContainer: {
    marginBottom: 20,
  },
  paymentMethodText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '400',
  },
  applePayText: {
    color: '#0149BA',
    fontWeight: '600',
  },
  finalBookingButton: {
    backgroundColor: '#131111',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  bookingButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  finalBookingButtonIcon: {
    width: 56,
    height: 56,
    marginRight: 15,
  },
  finalBookingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 75
  },
  termsText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    lineHeight: 16,
  },
  priceOptionsContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  paymentSelectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeToggleButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeToggleButtonOutline: {
    backgroundColor: '#0149BA',
  },
  themeToggleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  themeToggleTextOutline: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectedCircularDateButtonOutline: {
    backgroundColor: '#fff',
    borderColor: '#0149BA',
    borderWidth: 3,
  },
  timeSlotsInlineContainerOutline: {
    backgroundColor: '#fff',
  },
  priceOptionsContainerOutline: {
    backgroundColor: '#fff',
  },
  paymentSelectionContainerOutline: {
    backgroundColor: '#fff',
  },
  finalBookingButtonOutline: {
    backgroundColor: '#131111',
  },
  paymentMethodTextOutline: {
    color: '#333',
  },
  termsTextOutline: {
    color: '#666',
  },
  arenaTitleInlineOutline: {
    color: '#333',
  },
  arenaLocationInlineOutline: {
    color: '#333',
  },
  priceOptionInlineOutline: {
    backgroundColor: '#fff',
  },
  selectedPriceOptionInlineOutline: {
    backgroundColor: '#fff',
    borderColor: '#0149BA',
    borderWidth: 3,
    // top: -1
  },
  priceAmountInlineOutline: {
    color: '#333',
  },
  selectedPriceAmountInlineOutline: {
    color: '#0149BA',
    // marginTop: -3
  },
  priceDurationInlineOutline: {
    color: '#666',
  },
  selectedPriceDurationInlineOutline: {
    color: '#0149BA',
    // marginBottom: 3
  },
  selectedTimeTextInlineOutline: {
    color: '#333',
  },
  finalBookingButtonTextOutline: {
    color: '#fff',
  },
  dateButtonContentOutline: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTextOutline: {
    color: '#333',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 1,
    marginTop: -8,
  },
  dateNumberOutline: {
    color: '#333',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 1,
    borderColor: '#fff',
  },
  selectedDateNumberOutline: {
    color: '#0149BA',
  },
  dayNameOutline: {
    color: '#333',
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 4,
  },
  selectedIndicatorOutline: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0149BA',
    position: 'absolute',
    bottom: -6,
  },
  applePayButton: {
    padding: 5,
  },
  paymentModalOverlay: {
    flex: 1,
    backgroundColor: '#fff',
  },
  paymentModalContent: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 0,
  },
  paymentModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  paymentModalTitle: {
    fontSize: 24,
    textAlign: 'left',
    fontWeight: '600',
    color: '#000',
  },
  paymentModalCloseButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  paymentBookingDetails: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentBookingIcon: {
    marginRight: 15,
  },
  paymentBookingIconImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  paymentBookingInfo: {
    flex: 1,
  },
  paymentBookingDate: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentBookingVenue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  paymentBookingAddress: {
    color: '#666',
    fontSize: 12,
    fontWeight: '400',
  },
  paymentMethodsList: {
    flex: 1,
    marginHorizontal: 20,
  },
  paymentMethodItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentMethodRadioSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  paymentMethodRadioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  paymentMethodName: {
    color: '#333',
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  infoButton: {
    marginLeft: 8,
    padding: 2,
  },
  paymentMethodPrice: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  paymentMethodIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  paymentMethodIconText: {
    color: '#fff',
    fontSize: 12,
    // fontWeight: 'bold',
  },
  addPaymentMethodButton: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // marginRight: 20,
    marginBottom: 20,
  },
  addPaymentMethodText: {
    color: '#6b7280',
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 20,
  },
  goToPaymentButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    marginBottom: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToPaymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  expandableSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  expandableTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
});
