#==============================================================================
#    ATS: Message Options [VXA]
#    Version: 1.0.7
#    Author: modern algebra (rmrk.net)
#    Date: 28 January 2013
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  Description:
#
#    This script allows you to control a number of things about the message 
#   window, such as its size and position. It also provides for scrolling
#   and review, and it includes the option to create a name window to identify
#   the speaker (or for any other use).
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  ATS Series:
#
#    This script is part of the Advanced Text System series of scripts. These
#   scripts are based off the Advanced Text System for RMVX, but since RMVX Ace
#   has a much more sensibly designed message system, it is no longer necessary
#   that it be one large script. For that reason, and responding to feedback on
#   the ATS, I have split the ATS into multiple different scripts so that you
#   only need to pick up the components for the features that you want. It is
#   therefore easier to customize and configure.
#
#    To find more scripts in the ATS Series, please visit:
#      http://rmrk.net/index.php/topic,44525.0.html
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  Instructions:
#
#    There are a lot of configuration options in this script, and I direct you 
#   to the Editable Region at line 125 for detailed comments on what each does
#   Here, I will just list them:
#
#          :append_text                       :scrolling_on 
#          :scroll_speed                      :pause_before_scroll 
#          :scroll_by_page                    :scroll_review 
#          :letter_sound_on                   :letter_se 
#          :letters_per_se                    :random_pitch 
#          :start_sound_on                    :start_se
#          :pause_sound_on                    :pause_se 
#          :terminate_sound_on                :terminate_se
#          :finish_sound_on                   :finish_se 
#          :message_windowskin                :message_dim_bg
#          :message_win_x                     :message_win_y 
#          :character_size_offset             :do_not_obscure
#          :message_win_width                 :message_win_height 
#          :message_win_padding               :fit_window_to_message 
#          :fit_window_width_range            :fit_window_height_range
#          :name_win_min_width                :name_win_padding 
#          :name_format                       :name_win_align
#          :name_win_x                        :name_win_y 
#          :name_win_x_offset                 :name_win_y_offset
#
#    As with other ATS scripts, you can change the value of these options in
#   game with the following codes in a script call:
#
#      ats_next(:message_option, x)
#      ats_all(:message_option, x)
#
#   Where :message_option is the symbol you want and x is the value you want 
#   to change it to. ats_next will only change it for the very next message, 
#   while ats_all will change it for every message to follow.
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  List of Special Message Codes:
#
#    The following is a complete list of the message codes at your disposal. 
#   Simply insert them into a Display Message command.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#  Name Box:
#
# \nb{text}   - Shows the namebox with text displayed.
# \nbl{text}  - Shows the namebox left of the message with text displayed.
# \nbr{text}  - Shows the namebox right of the message with text displayed.
# \nbt{text}  - Shows the namebox above the message with text displayed.
# \nbb{text}  - Shows the namebox below the message with text displayed.
# \nblt{text} - Shows the namebox left and above with text displayed.
# \nblb{text} - Shows the namebox left and below with text displayed.
# \nbrt{text} - Shows the namebox right and above with text displayed.
# \nbrb{text} - Shows the namebox right and below with text displayed.
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#  Message Size and Position:
#
# \fit   - Fits the window to this message (:paragraph_format must be false)
# \e[n]  - Sets the text box in reference to character n(0 = Player; >0 = Event)
# \et[n] - Sets the text box above character n (0 = Player; >0 = Event)
# \eb[n] - Sets the text box below character n (0 = Player; >0 = Event)
# \el[n] - Sets the text box to the left of character n(0 = Player; >0 = Event)
# \er[n] - Sets the text box to the right of character n(0 = Player; >0 = Event)
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#  Sound Effects:
#
# \lse - Turns the letter by letter SE on.
# /lse - Turns the letter by letter SE off.
# \pse - Turns the pause SE on.
# /pse - Turns the pause SE off.
# \fse - Turns the finish SE on.
# /fse - Turns the finish SE off.
# \tse - Turns the terminate SE on.
# /tse - Turns the terminate SE off.
# \pSE[file,x,y] - Play the "file" SE at volume x and pitch y
# \pME[file,x,y] - Play the "file" ME at volume x and pitch y
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#  Other Effects:
# 
# \pANIM[x,n] - Play the animation with ID n over character x
# \pBLN[x,n] - Play the balloon with ID n over character x
#==============================================================================

$imported = {} unless $imported
$imported[:ATS_MessageOptions] = true

#==============================================================================
# ** Game_ATS
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  Summary of Changes:
#    new public instance variables - append_text; scrolling_on; scroll_speed;
#      pause_before_scroll; scroll_by_page; scroll_review; letter_sound_on;
#      letter_se; letters_per_se; random_pitch; start_sound_on; start_se;
#      pause_sound_on; pause_se; terminate_sound_on; terminate_se; 
#      finish_sound_on; finish_se; message_windowskin; message_dim_bg; 
#      message_win_x; message_win_y; character_size_offset; do_not_obscure;
#      message_win_width; message_win_height; message_win_padding; 
#      fit_window_to_message; fit_window_width_range; fit_window_height_range;
#      name_win_min_width; name_win_padding; name_format; name_win_align;
#      name_win_x; name_win_y; name_win_x_offset; name_win_y_offset
#==============================================================================

class Game_ATS
  CONFIG ||= {}
  CONFIG[:ats_message_options] = {
	  ats_message_options: true, 
    #\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    #  EDITABLE REGION
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    #  :append_text - Set this value to either true or false. If true, then any
    # immediately subsequent display text event commands with the same settings
    # will be joined together and they will show in the same message window if
    # there is space. This option is primarily useful for message scrolling and
    # oversized windows. If you are using ATS: Formatting, the value set in 
    # this script applies and the one set in ATS: Formatting does not.
    append_text:           true,
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    # Scrolling
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    #  If :scrolling_on is false, then whenever a message ends, it will pause
    # and create a new page. If :scrolling_on is true, then it will smoothly
    # scroll instead, and you can choose whether to scroll line by line or
    # by page. Practically, :append_text needs to be true for this feature to
    # be useful.
    scrolling_on:          true,
      #  :scroll_speed - the pixels scrolled per frame when scrolling. If this
      # is 0, then it will be instant.
      scroll_speed:        2,
      #  :pause_before_scroll - when this is true, the message will pause
      # before the page (or line) scrolls.
      pause_before_scroll: false,
      #  :scroll_by_page - If this is true, then the message will scroll one
      # whole page at a time. If it is false, it will scroll after each line.
      scroll_by_page:      false,
      #  :scroll_review - When this is true, then at each time the message 
      # pauses, the player can use the Up and Down directional keys to review
      # the entire message
      scroll_review:       true,
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    # Sound Effects
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    # Letter By Letter SE
    #  :letter_sound_on - when this is true, the sound specified below will 
    # be played as letters are drawn, according to a chosen frequency.
    letter_sound_on:       true,
      #  :letter_se - This determines what sound effect is played when
      # :letter_sound_on is true. You set it as an array, with the first entry
      # being the filename as a string, and the other entries being integers
      # representing the volume. EX: ["Cursor2", 60],
      letter_se:           ["Cursor2"], 
      #  :letters_per_se - This determines how frequently :letter_se is played
      # when :letter_sound_on is true. Basically, the number you put in the 
      # amount of letters that are drawn between each sound effect. If, for
      # instance, it is 5, then 5 letters are drawn between playing the SE.
      letters_per_se:      4,
      #  :random_pitch - This range determines the pitch the sound effect is
      # played at. It is in the form x...y and if x is equal to y, then the SE
      # is always played at that pitch. If they are different, x must be less
      # than y and each SE will play at a pitch randomly selected between the
      # x and y. It is used to simulate changes of pitch in speech.
      random_pitch:        100...100,
    # Start SE
    #  :start_sound_on - when this is true, the sound specified at :start_se
    # will play whenever a message first opens.
    start_sound_on:        false,
      #  :start_se - This determines what sound effect is played when
      # :start_sound_on is true. You set it as an array, with the first entry
      # being the filename as a string, and the other entries being integers
      # representing the volume and the pitch. EX: ["Chime2", 80, 50],
      start_se:            ["Chime2"], 
    # Pause SE
    #  :pause_sound_on - when this is true, the sound specified at :pause_se is
    # played whenever a message pauses and waits for player input.
    pause_sound_on:        false,
      #  :pause_se - This determines what sound effect is played when
      # :pause_sound_on is true. You set it as an array, with the first entry
      # being the filename as a string, and the other entries being integers
      # representing the volume and the pitch. EX: ["Decision2"],
      pause_se:            ["Decision2"], 
    # Finish SE
    #  :finish_sound_on - when this is true, the sound specified at :finish_se
    # is played whenever a message finishes.
    finish_sound_on:       false,
      #  :finish_se - This determines what sound effect is played when
      # :finish_sound_on is true. You set it as an array, with the first entry
      # being the filename as a string, and the other entries being integers
      # representing the volume and the pitch. EX: ["Chime1", 120],
      finish_se:           ["Chime1"], 
    # Terminate SE
    #  :terminate_sound_on - when this is true, the sound specified at 
    # :terminate_se is played whenever a message finishes.
    terminate_sound_on:    false,
      #  :terminate_se - This determines what sound effect is played when
      # :terminate_sound_on is true. You set it as an array, with the first 
      # entry being the filename as a string, and the other entries being 
      # integers representing the volume and the pitch. EX: ["Cancel2"],
      terminate_se:        ["Cancel2"], 
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    # Message Window Settings
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    # Message Graphics
    #  :message_windowskin - This sets the windowskin of the message window
    # and all its related windows. The graphic chosen must be in the System
    # folder of Graphics.
    message_windowskin:    "Window",
    #  :message_dim_bg - This feature allows you to replace the default dim 
    # background with an image of your choosing. Just set it to a filename. The
    # graphic chosen must be in the System folder of Graphics
    message_dim_bg:        "",
    # Message Position
    #  :message_win_x - This determines the x-coordinate of the message window.
    # When set to -1, it is centred. When set to any other integer, it is 
    # directly set to that x-coordinate on the screen. This is completely 
    # overridden when you use message codes to set the message window in 
    # reference to a character.
    message_win_x:         -1, # -1 = centred
    #  :message_win_y - This determines the y-coordinate of the message window.
    # When set to -1, it defaults to the position setting in the normal message
    # window. When set to any other integer, it is directly set to that 
    # y-coordinate on the screen. This is completely overridden when you
    # use message codes to set the message window in reference to a character.
    message_win_y:         -1, # -1 = default to position
    #  :character_size_offset - This feature is used when setting the message
    # window's position in reference to a character, and it should be set to 
    # the size of the character (in the direction the window is being set). In
    # other words, if setting a window to above or below the character, this
    # should be set to the height of that character. If setting it to the left
    # or right of a character, this should be set to the width of the character
    character_size_offset: 32,
    #  :do_not_obscure - This feature is only useful if :message_win_y is set
    # to -1 and you are using the default position setting. Basically, if you
    # put the ID of any character (0 is the player; otherwise the ID of the 
    # event you don't want to obscure) in this array, then the message window 
    # will be repositioned so as not to obscure that character. In other words,
    # if you set this value to [0, 5], then the message window will never 
    # obscure either the player or the event with ID 5. So, if a message window
    # is set to bottom, but drawing it at the bottom would cover the player, 
    # then the message window will instead be positioned to Top.
    do_not_obscure:        [],
    # Message Window Size
    #  :message_win_width - This sets the width, in pixels, of the message
    # window. It is overridden if :fit_window_to_message is true.
    message_win_width:     544,
    #  :message_win_height - This sets the height, in pixels, of the message
    # window. A normal line of text is 24 pixels high. This value is overridden
    # if :fit_window_to_message is true.
    message_win_height:    120,
    #  :message_win_padding - This value determines the size, in pixels, of the 
    # border of the message window
    message_win_padding:   12,
    #  :fit_window_to_message - when this is true, the message window's width 
    # will be fitted to the longest line and the message window's height will 
    # be set to include as many lines as possible. The sizes in both respects
    # are limited by :fit_window_width_range and :fit_window_height_range. If 
    # you are using ATS: Formatting, then this feature will only work if
    # :paragraph_format is off.
    fit_window_to_message: false,
      #  :fit_window_width_range - This is a range in the form x...y, where 
      # x must be less than y. x is the minimum width the window to which the
      # window can be set when using :fit_window_to_message, while y is the 
      # maximum.
      fit_window_width_range: 160...544,
      #  :fit_window_height_range - This is a range in the form x...y, where 
      # x must be less than y. x is the minimum height the window to which the
      # window can be set when using :fit_window_to_message, while y is the 
      # maximum.
      fit_window_height_range: 72...144,
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    # Name Window Settings
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    # Name Window Size
    #  :name_win_min_width - normally, the name window will be sized to fit
    # whatever name is input in it. This value determines the minimum width 
    # that the name window can be, such that if the name is shorter, the
    # name window will be set to this size.
    name_win_min_width:    32,
    #  :name_win_padding - this determines the size of the border of the name
    # window. The default for most other windows is 12.
    name_win_padding:      8,
    # Name Format
    #  :name_format - This allows you to set some default formatting for names.
    # Basically, it is a string ('%s'), and the %s will be replaced by whatever
    # name you set for the message. This allows you to use some special message
    # codes for every name, without having to put it in. For instance, if you
    # set this value to '\c[16]%s', then every name would automatically be set
    # to colour 16.
    name_format:          '%s',
    #  :name_win_align - This sets the alignment of the name in the window. 
    # Since the window is normally sized to fit the name, this will generally
    # only matter if the name is short enough to engage the :name_win_min_width
    # or if there is more than one line in the name window.
    name_win_align:       1,
    # Name Position
    #  :name_win_x - This sets the x-position of the name window. It can be set
    # to either :l, :r, or an integer. If :l, it will be set flush with the left
    # corners of the message window, offset by + :name_win_x_offset. If :r, it
    # will be set flush with the right corners of the message window, offset 
    # by - :name_win_x_offset. If an integer, it will be directly set to that 
    # x-coordinate on the screen.
    name_win_x:           :l,
    #  :name_win_y - This sets the y-position of the name window. It can be set
    # to either :t, :b, or an integer. If :t, it will be set flush with the top
    # corners of the message window, offset by + :name_win_y_offset. If :b, it
    # will be set flush with the bottom corners of the message window, offset 
    # by - :name_win_y_offset. If an integer, it will be directly set to that 
    # y-coordinate on the screen.
    name_win_y:           :t,
    #  :name_win_x_offset - this is the number of pixels offset when
    # :name_win_x is set to :l or :r. When :l, it is added. When :r, it is
    # subtracted.
    name_win_x_offset:    8,
    #  :name_win_y_offset - this is the number of pixels offset when
    # :name_win_y is set to :t or :b. When :t, it is added. When :b, it is
    # subtracted.
    name_win_y_offset:    8,
	  #||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
    #  END EDITABLE REGION
    #////////////////////////////////////////////////////////////////////////
  }
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Public Instance Variables
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  CONFIG[:ats_formatting].delete(:append_text) if $imported[:ATS_Formatting]
  CONFIG[:ats_message_options].keys.each { |key| attr_accessor key }
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Overwrite SE methods 
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  [:letter_se, :start_se, :pause_se, :finish_se, :terminate_se].each { |method_name|
    define_method(:"#{method_name}=") do |*args|
      instance_variable_set(:"@#{method_name}", Game_ATS.set_sound_effect(*args))
    end
  }
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set Sound Effect
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def self.set_sound_effect(settings)
    return settings if settings.is_a?(RPG::SE)
    settings = [settings] if settings.is_a?(String)
    settings[1] = 80 if !settings[1]
    RPG::SE.new(*settings)
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set Random Pitch
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def random_pitch=(val)
    @random_pitch = val.is_a?(Integer) ? letter_se.pitch..(letter_se.pitch + val) : val
  end
end

#==============================================================================
#  Initialize Common ATS Data if no other ATS script interpreted first
#==============================================================================

if !$imported[:AdvancedTextSystem]
  #============================================================================
  # *** DataManager
  #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  #  Summary of Changes:
  #    aliased method - create_game_objects; make_save_contents;
  #      extract_save_contents
  #============================================================================
  module DataManager
    class << self
      alias modb_ats_crtgmobj_6yh7 create_game_objects
      alias mlba_ats_mksave_5tg9 make_save_contents
      alias ma_ats_extrcsvcon_8uj2 extract_save_contents
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Create Game Objects
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def self.create_game_objects(*args, &block)
      modb_ats_crtgmobj_6yh7(*args, &block)
      $game_ats = Game_ATS.new
      $game_ats.init_new_installs
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Make Save Contents
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def self.make_save_contents(*args, &block)
      contents = mlba_ats_mksave_5tg9(*args, &block)
      contents[:ats] = $game_ats
      contents
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Extract Save Contents
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def self.extract_save_contents(contents, *args, &block)
      ma_ats_extrcsvcon_8uj2(contents, *args, &block)
      $game_ats = contents[:ats] ? contents[:ats] : Game_ATS.new
      $game_ats.init_new_installs
    end
  end
  
  #============================================================================
  # ** Game_ATS
  #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  #  This class holds the default data for all scripts in the ATS series
  #============================================================================
  
  class Game_ATS
    def initialize; reset; end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Reset any or all installed ATS scripts
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def reset(script_name = nil)
      if script_name.is_a? (Symbol) # If script to reset specified
        CONFIG[script_name].each_pair { |key, value| 
          self.send("#{key}=".to_sym, value) 
          $game_message.send("#{key}=".to_sym, value)
        }
      else                          # Reset all ATS scripts
        CONFIG.keys.each { |script| reset(script) }
      end
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Initialize any newly installed ATS scripts
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def init_new_installs
      CONFIG.keys.each { |script| reset(script) unless self.send(script) }
    end
  end
  
  #============================================================================
  # ** Game_Message
  #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  #  Summary of Changes:
  #    aliased method - clear
  #============================================================================
  
  class Game_Message
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Clear
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    alias mlb_ats_clrats_5tv1 clear
    def clear(*args, &block)
      mlb_ats_clrats_5tv1(*args, &block) # Run Original Method
      return if !$game_ats
      Game_ATS::CONFIG.values.each { |installed|
        installed.keys.each { |key| self.send("#{key}=".to_sym, $game_ats.send(key)) }
      }
    end
  end
  
  #============================================================================
  # ** Game_Interpreter
  #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  #  Summary of Changes:
  #    new methods - ats_all; ats_next
  #============================================================================
  
  class Game_Interpreter
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * ATS All
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def ats_all(sym, *args, &block)
      $game_ats.send("#{sym}=".to_sym, *args, &block)
      ats_next(sym, *args, &block)
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * ATS Next
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def ats_next(sym, *args, &block)
      $game_message.send("#{sym}=".to_sym, *args, &block)
    end
  end
$imported[:AdvancedTextSystem] = true
end

#==============================================================================
# ** Game_Message
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  Summary of Changes:
#    new attr_reader methods - show_on_character_id; show_on_character_pos
#    new attr_accessor methods - append_text; scrolling_on; scroll_speed;
#      pause_before_scroll; scroll_by_page; scroll_review; letter_sound_on;
#      letter_se; letters_per_se; random_pitch; start_sound_on; start_se;
#      pause_sound_on; pause_se; terminate_sound_on; terminate_se; 
#      finish_sound_on; finish_se; message_windowskin; message_dim_bg; 
#      message_win_x; message_win_y; character_size_offset; do_not_obscure;
#      message_win_width; message_win_height; message_win_padding; 
#      fit_window_to_message; fit_window_width_range; fit_window_height_range;
#      name_win_min_width; name_win_padding; name_format; name_win_align;
#      name_win_x; name_win_y; name_win_x_offset; name_win_y_offset;
#      message_name
#    aliased method - clear; all_text
#    new methods - atsmo_play_sound?; atsmo_setup_name_window
#==============================================================================

class Game_Message
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Public Instance Variables
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  attr_reader :message_name
  attr_reader :show_on_character_id
  attr_reader :show_on_character_pos
  Game_ATS::CONFIG[:ats_message_options].keys.each { |key| attr_accessor key }
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Clear
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_cler_2yx7 clear
  def clear(*args, &block)
    @show_on_character_id = -1
    @show_on_character_pos = :t
    @message_name = nil
    tso = @terminate_sound_on # Don't reset terminate sound
    maatsmo_cler_2yx7(*args, &block) # Call Original Method
    @terminate_sound_on = tso unless tso.nil?
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # SE Definitions
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  [:letter, :start, :pause, :finish, :terminate].each { |method_name|
    define_method(:"#{method_name}_se=") do |*args|
      instance_variable_set(:"@#{method_name}_se", Game_ATS.set_sound_effect(*args))
    end
  }
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Play Sound?
  #    type : :letter, :start, :pause, :finish, or :terminate
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_play_sound?(type)
    return instance_variable_get(:"@#{type}_sound_on") && 
      !instance_variable_get(:"@#{type}_se").nil?
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set Random Pitch
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def random_pitch=(val)
    @random_pitch = val.is_a?(Integer) ? letter_se.pitch..(letter_se.pitch + val) : val
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set Name for Name Window
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def message_name=(string)
    @message_name = !@name_format.empty? ? sprintf(@name_format, string) : string
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * All Text
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_altx_7jv2 all_text
  def all_text(*args, &block)
    result = maatsmo_altx_7jv2(*args, &block) # Call Original Method
    # Look for the Name Box Code
    if result[/\\NB([LRTB]*)\{(.+?)\}/im]
      atsmo_setup_name_window($2, $1) 
      result.gsub!(/\\NB([LRTB]*)\{(.+?)\}/im, "")
    end
    if result[/([\\\/])FIT/i]
      @fit_window_to_message = $1 == "\\" 
      result.gsub!(/[\\\/]FIT/i, "")
    end
    if result[/\\E([LRTB]?)\[(\d+)\]/i]
      @show_on_character_pos = $1.downcase.to_sym if !$1.empty?
      @show_on_character_id = $2.to_i
      # Don't show on character if the event referenced is nil
      @show_on_character_id = -1 if show_on_character_id > 0 && !$game_map.events[show_on_character_id]
      result.gsub!(/\\E[LRTB]?\[\d+\]/i, "")
    end
    result
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set Name
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_setup_name_window(name, pos)
    self.message_name = name
    pos.each_char {|letter|
      val = letter.downcase.to_sym
      case val
      when :l, :r then self.name_win_x = val
      when :t, :b then self.name_win_y = val
      end
    }
  end
end

#==============================================================================
# ** Game_Interpreter
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  Summary of Changes:
#    aliased methods - command_101; next_event_code
#    new method - maatsf_same_message_conditions?
#==============================================================================

if !$imported[:ATS_Formatting]
  class Game_Interpreter
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Display Text Message
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    alias maatsf_disptext_3jf5 command_101
    def command_101(*args, &block)
      @ats_appending_text = $game_message.append_text
      maatsf_disptext_3jf5(*args, &block) # Call Original Method
      @ats_appending_text = false
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Next Event Code
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    alias maatsf_nexcode_5rq9 next_event_code
    def next_event_code(*args, &block)
      result = maatsf_nexcode_5rq9(*args, &block) # Call Original Method
      if @ats_appending_text && result == 101
        if maats_same_message_conditions?(@index + 1)
          @index += 1
          result = next_event_code(*args, &block)
        end
      end
      result
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Same Message Conditions?
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def maats_same_message_conditions?(list_index)
      n_params = @list[list_index].parameters
      if ($imported[:MA_CompositeGraphics] || $imported[:ATS_FaceOptions]) &&
        @list[list_index + 1] && @list[list_index + 1].parameters[0][/^\\([AP])F\[(\d+)\]/i]
        param = $2.to_i
        actor = ($1 == 'A') ? $game_actors[param] : $game_party.members[param - 1]
        return (actor.face_name == $game_message.face_name &&
          actor.face_index == $game_message.face_index &&
          n_params[2] == $game_message.background && n_params[3] == $game_message.position)
      end
      n_params[0] == $game_message.face_name && n_params[1] == $game_message.face_index &&
        n_params[2] == $game_message.background && n_params[3] == $game_message.position
    end
  end
end

unless $imported[:"MA_ParagraphFormat_1.0.1"] # Overwrite if earlier version
  #============================================================================
  # ** MA_Window_ParagraphFormat
  #++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  #  This module inserts into Window_Base and provides a method to format the
  # strings so as to go to the next line if it exceeds a set limit. This is 
  # designed to work with draw_text_ex, and a string formatted by this method 
  # should go through that, not draw_text.
  #============================================================================

  module MA_Window_ParagraphFormat
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Calc Line Width
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def mapf_calc_line_width(line, tw = 0, contents_dummy = false)
      return tw if line.nil?
      line = line.clone
      unless contents_dummy
        real_contents = contents # Preserve Real Contents
        # Create a dummy contents
        self.contents = Bitmap.new(contents_width, 24)
        reset_font_settings
      end
      pos = {x: 0, y: 0, new_x: 0, height: calc_line_height(line)}
      test = @atsf_testing
      @atsf_testing = true # This 
      while line[/^(.*?)\e(.*)/]
        tw += text_size($1).width
        line = $2
        # Remove all ancillaries to the code, like parameters
        code = obtain_escape_code(line)
        # If direct setting of x, reset tw.
        tw = 0 if ($imported[:ATS_SpecialMessageCodes] && code.upcase == 'X') ||
          ($imported["YEA-MessageSystem"] && code.upcase == 'PX')
        #  If I need to do something special on the basis that it is testing, 
        # alias process_escape_character and differentiate using @atsf_testing
        process_escape_character(code, line, pos)
      end
      @atsf_testing = test
      #  Add width of remaining text, as well as the value of pos[:x] under the 
      # assumption that any additions to it are because the special code is 
      # replaced by something which requires space (like icons)
      tw += text_size(line).width + pos[:x]
      unless contents_dummy
        contents.dispose # Dispose dummy contents
        self.contents = real_contents # Restore real contents
      end
      return tw
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Format Paragraph
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def mapf_format_paragraph(text, max_width = contents_width)
      text = text.clone
      #  Create a Dummy Contents - I wanted to boost compatibility by using the 
      # default process method for escape codes. It may have the opposite effect, 
      # for some :( 
      real_contents = contents # Preserve Real Contents
      self.contents = Bitmap.new(contents_width, 24)
      reset_font_settings
      paragraph = ""
      while !text.empty?
        oline, nline, tw = mapf_format_by_line(text.clone, max_width)
        # Replace old line with the new one
        text.sub!(/#{Regexp.escape(oline)}/m, nline)
        paragraph += text.slice!(/.*?(\n|$)/)
        text.lstrip!
      end
      contents.dispose # Dispose dummy contents
      self.contents = real_contents # Restore real contents
      return paragraph
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Format By Line
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def mapf_format_by_line(text, max_width = contents_width)
      oline, nline, tw = "", "", 0
      loop do
        #  Format each word until reach the width limit
        oline, nline, tw, done = mapf_format_by_word(text, nline, tw, max_width)
        return oline, nline, tw if done
      end
    end
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # * Format By Word
    #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    def mapf_format_by_word(text, line, tw, max_width)
      return line, line, tw, true if text.nil? || text.empty?
      # Extract next word
      if text.sub!(/([ \t\r\f]*)(\S*)([\n\f]?)/, "") != nil
        prespace, word, line_end = $1, $2, $3
        ntw = mapf_calc_line_width(word, tw, true)
        pw = contents.text_size(prespace).width
        if (pw + ntw >= max_width)
          # Insert
          if line.empty?
            # If one word takes entire line
            return prespace + word, word + "\n", ntw, true 
          else
            return line + prespace + word, line + "\n" + word, tw, true
          end
        else
          line += prespace + word
          tw = pw + ntw
          # If the line is force ended, then end 
          return line, line, tw, true if !line_end.empty?
        end
      else
        return line, line, tw, true
      end
      return line, line, tw, false
    end
  end

  class Window_Base
    include MA_Window_ParagraphFormat unless $imported[:"MA_ParagraphFormat_1.0"]
  end

  $imported[:"MA_ParagraphFormat_1.0"] = true
  $imported[:"MA_ParagraphFormat_1.0.1"] = true
end

#==============================================================================
# *** MA Window ATS Message Options
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  This module mixes in with Window_Message and the Name window
#==============================================================================

module MA_Window_ATS_MessageOptions
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Resize
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def resize(w, h)
    if w != self.width || h != self.height
      self.width = w
      self.height = h
      create_contents
    end
  end
end

#==============================================================================
# ** Window_ATS_Name
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  This window shows a single message to identify the speaker of a message.
#==============================================================================

class Window_ATS_Name < Window_Base
  include MA_Window_ATS_MessageOptions
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Object Initialization
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def initialize(message_window)
    @message_window = message_window
    super(0, 0, $game_message.name_win_min_width, line_height + standard_padding*2)
    @current_windowskin = windowskin
    update_placement
    self.visible = false
    self.z = @message_window.z + 1
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Frame Update
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def update(*args, &block)
    super(*args, &block)
    if $game_message.message_name.nil?
      self.visible = false
    else
      self.openness = @message_window.openness
      self.visible = @message_window.visible
      self.opacity = @message_window.opacity
      self.back_opacity = @message_window.back_opacity
      set_text($game_message.message_name)
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Placement
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def update_placement
    set_x_position
    set_y_position
    update_padding
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set X Position
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def set_x_position
    self.x = case $game_message.name_win_x
    when :l then @message_window.x + $game_message.name_win_x_offset
    when :r then @message_window.x + @message_window.width - self.width - $game_message.name_win_x_offset
    else $game_message.name_win_x
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set y Position
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def set_y_position
    case $game_message.name_win_y
    when :t 
      self.y = @message_window.y - self.height + $game_message.name_win_y_offset
      self.y = @message_window.y + @message_window.height - $game_message.name_win_y_offset if self.y < 0 
    when :b 
      self.y = @message_window.y + @message_window.height - $game_message.name_win_y_offset
      self.y = @message_window.y - self.height + $game_message.name_win_y_offset if self.y + self.height > Graphics.height
    else
      self.y = $game_message.name_win_y
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Refresh
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def refresh
    contents.clear
    align = $game_message.name_win_align
    if align > 0
      y = 0
      for line in convert_escape_characters(@text.clone).split(/\n/)
        tw = mapf_calc_line_width(line)
        x = align*((contents_width - tw) / 2)
        draw_text_ex(x, y, line)
        y += calc_line_height(line)
      end
    else
      draw_text_ex(0, 0, @text)
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Set Text
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def set_text(text)
    if text.is_a?(String) && (@text != text || $game_message.name_win_min_width > contents.width)
      @text = text
      resize(*calc_window_size_by_text(text)) unless text.empty? 
      update_placement
      refresh
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Calculate Width and Height
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def calc_window_size_by_text(text)
    text = convert_escape_characters(text.clone)
    # Calculate width and height of window
    fit_w = $game_message.name_win_min_width
    h = standard_padding*2
    text.split(/\n/).each { |line|
      h += calc_line_height(line)
      tw = mapf_calc_line_width(line)
      fit_w = tw if tw > fit_w
    } 
    w = [fit_w + (standard_padding*2), Graphics.width].min
    return w, h
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Standard Padding
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def standard_padding
    $game_message.name_win_padding
  end
end

#==============================================================================
# ** Window_Message
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  Summary of Changes:
#    aliased methods - initialize; create_all_windows; update_all_windows;
#      update_placement; convert_escape_characters
#    new method - maatsmo_convert_escape_characters; atsmo_update_placement_x;
#      atsmo_update_placement_y; atsmo_update_placement_w; 
#      atsmo_update_placement_h;
#    overwritten method - process_new_line; standard padding;
#==============================================================================

class Window_Message
  include MA_Window_ATS_MessageOptions
  IS_ATSF_ABOVE = $imported[:ATS_Formatting] # Check if Formatting installed
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Object Initialization
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_initz_2uq7 initialize
  def initialize(*args, &block)
    @maatsmo_lblse_char_count = 0
    @scroll_review_max_oy = 0
    @atsmo_all_windows = []
    maatsmo_initz_2uq7(*args, &block) # Call Original Method
    @atsmo_old_windowskin = self.windowskin
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Create All Windows
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_creatalwins_2jf4 create_all_windows
  def create_all_windows(*args, &block)
    @atsmo_all_windows.clear
    maatsmo_creatalwins_2jf4(*args, &block) # Call Original Method
    @atsmo_name_window = Window_ATS_Name.new(self)
    @atsmo_all_windows.push(@gold_window, @choice_window, @number_window,
      @item_window, @atsmo_name_window)
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Create Back Bitmap
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_cretebbmp_3gl5 create_back_bitmap
  def create_back_bitmap(*args, &block)
    @back_bitmap.dispose if @back_bitmap && !@back_bitmap.disposed?
    if $game_message.message_dim_bg.empty?
      maatsmo_cretebbmp_3gl5(*args, &block)
    else
      @back_bitmap = Bitmap.new(width, height)
      bbmp = Cache.system($game_message.message_dim_bg)
      @back_bitmap.stretch_blt(@back_bitmap.rect, bbmp, bbmp.rect)
    end
    @back_sprite.bitmap = @back_bitmap if @back_sprite
    @current_bbmp = $game_message.message_dim_bg
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Standard Padding
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def standard_padding
    $game_message.message_win_padding # Get padding
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update All Windows
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_updtallwin_8ih4 update_all_windows
  def update_all_windows(*args, &block)
    maatsmo_updtallwin_8ih4(*args, &block) # Call Original Method
    @atsmo_name_window.update
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Free All Windows
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_dispallwins_4bx9 dispose_all_windows
  def dispose_all_windows(*args, &block)
    maatsmo_dispallwins_4bx9(*args, &block) # Call Original Method
    @atsmo_name_window.dispose
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Windowskins
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_update_windowskin
    new_wskin = Cache.system($game_message.message_windowskin)
    # If windowskin is new and exists
    if new_wskin != self.windowskin && new_wskin.width > 32
      ([self] + @atsmo_all_windows).each { |win| win.windowskin = new_wskin }
      @atsmo_name_window.set_text("") # Clear to redraw in right colour
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Placement
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_updplacem_3yg5 update_placement
  def update_placement(*args, &block)
    # Resize window
    resize(atsmo_update_placement_w, atsmo_update_placement_h)
    # Set X Position
    self.x = atsmo_update_placement_x
    # Set Y Position
    self.y = atsmo_update_placement_y(*args, &block) # Original Method, essentially
    update_padding
    @atsmo_name_window.update_placement
    create_back_bitmap if @current_bbmp != $game_message.message_dim_bg
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update X Position
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_update_placement_x
    # Show on Character
    return show_on_character_x if $game_message.show_on_character_id >= 0
    # If not showing on character
    return $game_message.message_win_x == -1 ? # Centre or else direct set
      (Graphics.width - self.width) / 2 : $game_message.message_win_x
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update X in reference to character
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def show_on_character_x
    character = atsmo_get_character($game_message.show_on_character_id)
    x = case $game_message.show_on_character_pos
    when :t, :b then character.screen_x - (self.width / 2)
    when :l then character.screen_x - self.width - ($game_message.character_size_offset / 2)
    when :r then character.screen_x + ($game_message.character_size_offset / 2)
    else character.screen_x
    end
    [[x, Graphics.width - self.width].min, 0].max
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Y Position
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_update_placement_y(*args, &block)
    # Show on Character
    return show_on_character_y if $game_message.show_on_character_id >= 0
    # If not showing on a character
    if $game_message.message_win_y == -1
      do_not_obscure_characters unless $game_message.do_not_obscure.empty?
      maatsmo_updplacem_3yg5(*args, &block) # Call Original Method
      return self.y
    else
      @gold_window.y = $game_message.message_win_y > @gold_window.height ? 0 : 
        Graphics.height - @gold_window.height
      return $game_message.message_win_y
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Y in reference to character
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def show_on_character_y
    character = atsmo_get_character($game_message.show_on_character_id)
    y = case $game_message.show_on_character_pos
    when :l, :r then character.screen_y - (($game_message.character_size_offset + self.height) / 2) 
    when :t then character.screen_y - $game_message.character_size_offset - self.height
    when :b then character.screen_y
    end
    [[y, Graphics.height - self.height].min, 0].max
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Message Window Width
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_update_placement_w
    $game_message.message_win_width == -1 ? Graphics.width : $game_message.message_win_width
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Message Window Height
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_update_placement_h
    $game_message.message_win_height
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Do Not Obstruct Characters
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def do_not_obscure_characters
    obscured = [0, 0, 0]
    positions = [2, 0, 1]
    positions.unshift(positions.delete($game_message.position))
    chosen_pos = positions[0]
    positions.each { |pos|
      y = ((Graphics.height - self.height) / 2)*pos
      range1 = y..(y + self.height)
      $game_message.do_not_obscure.each { |id|
        char = atsmo_get_character(id)
        next if char.nil?
        range2 = (char.screen_y - $game_message.character_size_offset)..char.screen_y
        obscured[pos] += 1 if range1 === range2.first || range2 === range1.first
      }
      chosen_pos = pos if obscured[pos] < obscured[chosen_pos]
    }
    $game_message.position = chosen_pos
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Get Character
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_get_character(id)
    id == 0 ? $game_player : $game_map.events[id]
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Process All Text
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_procsalltx_6fw2 process_all_text
  def process_all_text(*args, &block)
    # Play Start SE
    $game_message.start_se.play if $game_message.atsmo_play_sound?(:start) 
    fit_window_to_message(convert_escape_characters($game_message.all_text.dup))
    atsmo_update_windowskin
    update_placement
    maatsmo_procsalltx_6fw2(*args, &block) # Call Original Method
    # Play Finish SE
    $game_message.finish_se.play if $game_message.atsmo_play_sound?(:finish)
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Input Processing
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_proceinpt_3rf6 process_input
  def process_input(*args, &block)
    # Don't play Pause Sound if Finish Sound played
    $game_message.pause_sound_on = false if $game_message.atsmo_play_sound?(:finish)
    maatsmo_proceinpt_3rf6(*args, &block)
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Close Window and Wait for It to Fully Close
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_closewat_4dr9 close_and_wait
  def close_and_wait(*args, &block)
    # Play Terminate SE
    $game_message.terminate_se.play if $game_message.atsmo_play_sound?(:terminate)
    $game_message.terminate_sound_on = $game_ats.terminate_sound_on
    maatsmo_closewat_4dr9(*args, &block) # Call Original Method
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * New Page
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_newpge_3rj8 new_page
  def new_page(*args, &block)
    # Reset Contents size
    create_contents if contents.height > contents_height
    self.oy = 0
    maatsmo_newpge_3rj8(*args, &block) # Call Original Method
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Convert Escape Characters
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  if instance_methods(false).include?(:convert_escape_characters)
    # If convert_escape_characters already defined in Window_Message, just alias
    alias maatsmo_cnvrscchrc_7yc3 convert_escape_characters
    def convert_escape_characters(*args, &block)
      maatsmo_convert_escape_characters(maatsmo_cnvrscchrc_7yc3(*args, &block))
    end
  else
    # If convert_escape_characters undefined in Window_Message, call super method
    def convert_escape_characters(*args, &block)
      maatsmo_convert_escape_characters(super(*args, &block))
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * ATS MO Convert Escape Characters
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def maatsmo_convert_escape_characters(text)
    # Sound Effects
    text.gsub!(/\eP_?([MS]E)\[\s*\"?([^\",\]]+)\"?(.*?)\]/i) { "\ePLAYSOUND\[#{$1.upcase},\"#{$2}\"#{$3.gsub(/ /, "")}\]" }
    text.gsub!(/\eP_?(ANIM|BLN)\[\s*(\d+)[\s,:;]*(\d+)\s*\]/i) { "\eANIMATION\[#{$1.upcase == "ANIM" ? 0 : 1},#{$2},#{$3}\]" }
    letter_ary = ["L", "P", "F", "T"]
    # Turn Sound Effects on or off
    text.gsub!(/([\e\/])([LPFT])SE/i) { 
      num = ($1 == "\e" ? 0 : 1) + (2*letter_ary.index($2.upcase))
      "\eATSMOSE\[#{num}\]" }
    return text
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Process Escape Character
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatasmo_procescchar_2ia4 process_escape_character
  def process_escape_character(code, text, *args, &block) # (code, text, pos)
    case code.upcase
    when 'ATSMOSE'
      param = obtain_escape_param(text)
      return if @atsf_testing
      case param / 2
      when 0 then $game_message.letter_sound_on = (param == 0)    # Letter Sound
      when 1 then $game_message.pause_sound_on = (param == 2)     # Pause Sound
      when 2 then $game_message.finish_sound_on = (param == 4)    # Finish Sound
      when 3 then $game_message.terminate_sound_on = (param == 6) # Terminate Sound
      end
    when 'PLAYSOUND'
      return unless text.slice!(/^\[([MS]E),\"(.+?)\",?(\d*),?(\d*)\]/i)
      return if @atsf_testing
      RPG.const_get($1.to_sym).new($2, $3.empty? ? 80 : $3.to_i, $4.empty? ? 100 : $4.to_i).play
    when 'ANIMATION'
      return unless text.slice!(/^\[(\d+),(\d+),(\d+)\]/)
      return if @atsf_testing
      character = atsmo_get_character($2.to_i)
      if character
        case $1.to_i
        when 0 then character.animation_id = $3.to_i 
        when 1 then character.balloon_id = $3.to_i
        end
      end
    else
      maatasmo_procescchar_2ia4(code, text, *args, &block) # Run Original Method
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Process Normal Character
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_prcssnrmlch_3kz8 process_normal_character
  def process_normal_character(c, pos, *args, &block)
    maatsmo_prcssnrmlch_3kz8(c, pos, *args, &block) # Call Original Method
    # Play SE if not showing fast and the letter sound is on
    maatsmo_play_letter_by_letter_se if $game_message.atsmo_play_sound?(:letter) && 
      !@show_fast && !@line_show_fast
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * New Line Character Processing
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_procnewlin_3jd8 process_new_line
  def process_new_line(text, pos, *args)
    if $game_message.scrolling_on # If using scrolling
      @line_show_fast = false
      super
      if $imported[:ATS_Formatting] && IS_ATSF_ABOVE
        maatsf_paragraph_new_line(method(:maatsmo_process_new_line_scroll), text, pos)
      else
        maatsmo_process_new_line_scroll(text, pos)
      end
    else # Not using scrolling, so no need to interfere with this method
      maatsmo_procnewlin_3jd8(text, pos, *args) # Call Original Method
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * New Line Character Processing when scrolling
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def maatsmo_process_new_line_scroll(text, pos)
    if need_new_page?(text, pos)
      # Only pause if demanded
      input_pause if $game_message.pause_before_scroll && !@pause_skip
      scroll_h = !$game_message.scroll_by_page ? pos[:y] + pos[:height] : # Line
        contents.height + (pos[:y] - self.oy) # Page
      atsmo_scroll_page(text, pos, scroll_h)
      @show_fast = false # Don't speed through entire message
    end 
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Wait / Wait for One Character / Process Input
  #``````````````````````````````````````````````````````````````````````````
  # Do not permit these to run when testing
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  [:wait, :wait_for_one_character].each { |meth|
    alias_method(:"maatsmo_#{meth}_6hb1", meth)
    define_method(meth) do |*args|
      send(:"maatsmo_#{meth}_6hb1", *args) unless @atsf_testing
    end
  }
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Input Pause
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_inppuse_3kx5 input_pause
  def input_pause(*args, &block)
    return if @atsf_testing
    # Play Pause SE
    $game_message.pause_se.play if $game_message.atsmo_play_sound?(:pause) # Play
    if $game_message.scroll_review && self.oy > 0
      # If scroll review, need to overwrite this method
      self.pause = true
      wait(10)
      @scroll_review_max_oy = contents.height - contents_height
      until Input.trigger?(:B) || Input.trigger?(:C)
        update_scroll_review
        Fiber.yield
      end
      self.oy = @scroll_review_max_oy
      Input.update
      self.pause = false
    else
      maatsmo_inppuse_3kx5(*args, &block) # Call Original Method
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Play Letter By Letter SE
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def maatsmo_play_letter_by_letter_se
    # If drawn enough letters to play the SE
    if @maatsmo_lblse_char_count >= $game_message.letters_per_se
      @maatsmo_lblse_char_count = 0
      $game_message.letter_se.pitch = $game_message.random_pitch.first
      unless $game_message.random_pitch.first >= $game_message.random_pitch.last
        # Randomize pitch
        $game_message.letter_se.pitch += rand($game_message.random_pitch.last - $game_message.random_pitch.first) 
      end
      $game_message.letter_se.play # Play Letter by Letter SE
    else
      @maatsmo_lblse_char_count += 1 # Advance character count
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Resize Contents
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def resize_contents(w, h)
    bmp = contents # Save old contents
    self.contents = Bitmap.new(w, h)
    self.contents.font = bmp.font.dup
    self.contents.blt(0, 0, bmp, bmp.rect) # Draw old contents onto new
    bmp.dispose
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Fit Window to Message
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def fit_window_to_message(text)
    # Fit window to message if longes
    if !($imported[:ATS_Formatting] && $game_message.paragraph_format) &&
      $game_message.fit_window_to_message
      w, h = 0, 0
      for line in text.split(/[\n\r]+/)
        lw = mapf_calc_line_width(line) + new_line_x
        w = lw if lw > w
        h += calc_line_height(line)
      end
      $game_message.message_win_width = [$game_message.fit_window_width_range.last,
        [w + (standard_padding*2), $game_message.fit_window_width_range.first].max].min
      $game_message.message_win_height = [$game_message.fit_window_height_range.last, 
        [h + (standard_padding*2), $game_message.fit_window_height_range.first].max].min
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Scroll to Next Line
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def atsmo_scroll_page(text, pos, height)
    resize_contents(contents.width, height)
    goal_oy = contents.height - contents_height
    if $game_message.scroll_speed <= 0
      self.oy = goal_oy # Instant scroll
    else
      until self.oy == goal_oy # Scroll until goal reached
        self.oy += [$game_message.scroll_speed, goal_oy - self.oy].min
        Fiber.yield
      end
    end
  end
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Scroll Review
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  def update_scroll_review
    if Input.press?(:UP)
      self.oy -= [4, self.oy].min
    elsif Input.press?(:DOWN) # self.oy = contents.height - contents_height
      self.oy += [4, @scroll_review_max_oy - self.oy].min
    end
  end
end

#==============================================================================
# ** Window_ChoiceList
#++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#  Summary of Changes:
#    aliased method - update_placement
#==============================================================================

class Window_ChoiceList
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  # * Update Window Position
  #~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  alias maatsmo_updplace_3ib6 update_placement
  def update_placement(*args, &block)
    maatsmo_updplace_3ib6(*args, &block) # Call original method
    if !$imported[:ATS_AdvancedChoices]
      self.x = @message_window.x
      self.x += @message_window.width - self.width unless $game_message.name_win_x == :r
    end
  end
end