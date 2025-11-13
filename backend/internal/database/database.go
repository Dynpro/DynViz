package database

import (
	"DynViz/config"
	"DynViz/models"
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitPostgresDB() {

	println("Initializing PostgresSQL")

	// dsn := "host=localhost user=postgres password=postgres dbname=test port=51000432 sslmode=disable"

	// dsn := config.GetPostgresDBConfig()

	db, err := gorm.Open(postgres.Open(config.GetPostgresDBConfig().PostgresDBConnectionString()), &gorm.Config{})
	if err != nil {
		log.Fatalf("\nError connecting to PostgresSQL: %v", err)
	} else {
		log.Println("PostgresSQL Connection established successfully")
	}

	DB = db

	// Automigrate all the tables
	err = models.AutoMigrate(db)

	if err != nil {
		log.Fatalf("\nError migrating models to PostgresSQL: %v", err)
	} else {
		log.Println("Migrated models to PostgresSQL successfully")
	}
}

func GetPostgresDBConnection() *gorm.DB {
	return DB
}

func PrefillDB(prefill bool) bool {

	if prefill {

		db := GetPostgresDBConnection()

		// country_codes
		country_codes := []models.CountryCode{
			{CountryCode: "+7 840", Country: "Abkhazia"},
			{CountryCode: "+93", Country: "Afghanistan"},
			{CountryCode: "+355", Country: "Albania"},
			{CountryCode: "+213", Country: "Algeria"},
			{CountryCode: "+1 684", Country: "American Samoa"},
			{CountryCode: "+376", Country: "Andorra"},
			{CountryCode: "+244", Country: "Angola"},
			{CountryCode: "+1 264", Country: "Anguilla"},
			{CountryCode: "+1 268", Country: "Antigua and Barbuda"},
			{CountryCode: "+54", Country: "Argentina"},
			{CountryCode: "+374", Country: "Armenia"},
			{CountryCode: "+297", Country: "Aruba"},
			{CountryCode: "+247", Country: "Ascension"},
			{CountryCode: "+61", Country: "Australia"},
			{CountryCode: "+672", Country: "Australian External Territories"},
			{CountryCode: "+43", Country: "Austria"},
			{CountryCode: "+994", Country: "Azerbaijan"},
			{CountryCode: "+1 242", Country: "Bahamas"},
			{CountryCode: "+973", Country: "Bahrain"},
			{CountryCode: "+880", Country: "Bangladesh"},
			{CountryCode: "+1 246", Country: "Barbados"},
			{CountryCode: "+1 268", Country: "Barbuda"},
			{CountryCode: "+375", Country: "Belarus"},
			{CountryCode: "+32", Country: "Belgium"},
			{CountryCode: "+501", Country: "Belize"},
			{CountryCode: "+229", Country: "Benin"},
			{CountryCode: "+1 441", Country: "Bermuda"},
			{CountryCode: "+975", Country: "Bhutan"},
			{CountryCode: "+591", Country: "Bolivia"},
			{CountryCode: "+387", Country: "Bosnia and Herzegovina"},
			{CountryCode: "+267", Country: "Botswana"},
			{CountryCode: "+55", Country: "Brazil"},
			{CountryCode: "+246", Country: "British Indian Ocean Territory"},
			{CountryCode: "+1 284", Country: "British Virgin Islands"},
			{CountryCode: "+673", Country: "Brunei"},
			{CountryCode: "+359", Country: "Bulgaria"},
			{CountryCode: "+226", Country: "Burkina Faso"},
			{CountryCode: "+257", Country: "Burundi"},
			{CountryCode: "+855", Country: "Cambodia"},
			{CountryCode: "+237", Country: "Cameroon"},
			{CountryCode: "+1", Country: "Canada"},
			{CountryCode: "+238", Country: "Cape Verde"},
			{CountryCode: "+ 345", Country: "Cayman Islands"},
			{CountryCode: "+236", Country: "Central African Republic"},
			{CountryCode: "+235", Country: "Chad"},
			{CountryCode: "+56", Country: "Chile"},
			{CountryCode: "+86", Country: "China"},
			{CountryCode: "+61", Country: "Christmas Island"},
			{CountryCode: "+61", Country: "Cocos-Keeling Islands"},
			{CountryCode: "+57", Country: "Colombia"},
			{CountryCode: "+269", Country: "Comoros"},
			{CountryCode: "+242", Country: "Congo"},
			{CountryCode: "+243", Country: "Congo, Dem. Rep. of (Zaire)"},
			{CountryCode: "+682", Country: "Cook Islands"},
			{CountryCode: "+506", Country: "Costa Rica"},
			{CountryCode: "+385", Country: "Croatia"},
			{CountryCode: "+53", Country: "Cuba"},
			{CountryCode: "+599", Country: "Curacao"},
			{CountryCode: "+537", Country: "Cyprus"},
			{CountryCode: "+420", Country: "Czech Republic"},
			{CountryCode: "+45", Country: "Denmark"},
			{CountryCode: "+246", Country: "Diego Garcia"},
			{CountryCode: "+253", Country: "Djibouti"},
			{CountryCode: "+1 767", Country: "Dominica"},
			{CountryCode: "+1 809", Country: "Dominican Republic"},
			{CountryCode: "+670", Country: "East Timor"},
			{CountryCode: "+56", Country: "Easter Island"},
			{CountryCode: "+593", Country: "Ecuador"},
			{CountryCode: "+20", Country: "Egypt"},
			{CountryCode: "+503", Country: "El Salvador"},
			{CountryCode: "+240", Country: "Equatorial Guinea"},
			{CountryCode: "+291", Country: "Eritrea"},
			{CountryCode: "+372", Country: "Estonia"},
			{CountryCode: "+251", Country: "Ethiopia"},
			{CountryCode: "+500", Country: "Falkland Islands"},
			{CountryCode: "+298", Country: "Faroe Islands"},
			{CountryCode: "+679", Country: "Fiji"},
			{CountryCode: "+358", Country: "Finland"},
			{CountryCode: "+33", Country: "France"},
			{CountryCode: "+596", Country: "French Antilles"},
			{CountryCode: "+594", Country: "French Guiana"},
			{CountryCode: "+689", Country: "French Polynesia"},
			{CountryCode: "+241", Country: "Gabon"},
			{CountryCode: "+220", Country: "Gambia"},
			{CountryCode: "+995", Country: "Georgia"},
			{CountryCode: "+49", Country: "Germany"},
			{CountryCode: "+233", Country: "Ghana"},
			{CountryCode: "+350", Country: "Gibraltar"},
			{CountryCode: "+30", Country: "Greece"},
			{CountryCode: "+299", Country: "Greenland"},
			{CountryCode: "+1 473", Country: "Grenada"},
			{CountryCode: "+590", Country: "Guadeloupe"},
			{CountryCode: "+1 671", Country: "Guam"},
			{CountryCode: "+502", Country: "Guatemala"},
			{CountryCode: "+224", Country: "Guinea"},
			{CountryCode: "+245", Country: "Guinea-Bissau"},
			{CountryCode: "+595", Country: "Guyana"},
			{CountryCode: "+509", Country: "Haiti"},
			{CountryCode: "+504", Country: "Honduras"},
			{CountryCode: "+852", Country: "Hong Kong SAR China"},
			{CountryCode: "+36", Country: "Hungary"},
			{CountryCode: "+354", Country: "Iceland"},
			{CountryCode: "+91", Country: "India"},
			{CountryCode: "+62", Country: "Indonesia"},
			{CountryCode: "+98", Country: "Iran"},
			{CountryCode: "+964", Country: "Iraq"},
			{CountryCode: "+353", Country: "Ireland"},
			{CountryCode: "+972", Country: "Israel"},
			{CountryCode: "+39", Country: "Italy"},
			{CountryCode: "+225", Country: "Ivory Coast"},
			{CountryCode: "+1 876", Country: "Jamaica"},
			{CountryCode: "+81", Country: "Japan"},
			{CountryCode: "+962", Country: "Jordan"},
			{CountryCode: "+7 7", Country: "Kazakhstan"},
			{CountryCode: "+254", Country: "Kenya"},
			{CountryCode: "+686", Country: "Kiribati"},
			{CountryCode: "+965", Country: "Kuwait"},
			{CountryCode: "+996", Country: "Kyrgyzstan"},
			{CountryCode: "+856", Country: "Laos"},
			{CountryCode: "+371", Country: "Latvia"},
			{CountryCode: "+961", Country: "Lebanon"},
			{CountryCode: "+266", Country: "Lesotho"},
			{CountryCode: "+231", Country: "Liberia"},
			{CountryCode: "+218", Country: "Libya"},
			{CountryCode: "+423", Country: "Liechtenstein"},
			{CountryCode: "+370", Country: "Lithuania"},
			{CountryCode: "+352", Country: "Luxembourg"},
			{CountryCode: "+853", Country: "Macau SAR China"},
			{CountryCode: "+389", Country: "Macedonia"},
			{CountryCode: "+261", Country: "Madagascar"},
			{CountryCode: "+265", Country: "Malawi"},
			{CountryCode: "+60", Country: "Malaysia"},
			{CountryCode: "+960", Country: "Maldives"},
			{CountryCode: "+223", Country: "Mali"},
			{CountryCode: "+356", Country: "Malta"},
			{CountryCode: "+692", Country: "Marshall Islands"},
			{CountryCode: "+596", Country: "Martinique"},
			{CountryCode: "+222", Country: "Mauritania"},
			{CountryCode: "+230", Country: "Mauritius"},
			{CountryCode: "+262", Country: "Mayotte"},
			{CountryCode: "+52", Country: "Mexico"},
			{CountryCode: "+691", Country: "Micronesia"},
			{CountryCode: "+1 808", Country: "Midway Island"},
			{CountryCode: "+373", Country: "Moldova"},
			{CountryCode: "+377", Country: "Monaco"},
			{CountryCode: "+976", Country: "Mongolia"},
			{CountryCode: "+382", Country: "Montenegro"},
			{CountryCode: "+1664", Country: "Montserrat"},
			{CountryCode: "+212", Country: "Morocco"},
			{CountryCode: "+95", Country: "Myanmar"},
			{CountryCode: "+264", Country: "Namibia"},
			{CountryCode: "+674", Country: "Nauru"},
			{CountryCode: "+977", Country: "Nepal"},
			{CountryCode: "+31", Country: "Netherlands"},
			{CountryCode: "+599", Country: "Netherlands Antilles"},
			{CountryCode: "+1 869", Country: "Nevis"},
			{CountryCode: "+687", Country: "New Caledonia"},
			{CountryCode: "+64", Country: "New Zealand"},
			{CountryCode: "+505", Country: "Nicaragua"},
			{CountryCode: "+227", Country: "Niger"},
			{CountryCode: "+234", Country: "Nigeria"},
			{CountryCode: "+683", Country: "Niue"},
			{CountryCode: "+672", Country: "Norfolk Island"},
			{CountryCode: "+850", Country: "North Korea"},
			{CountryCode: "+1 670", Country: "Northern Mariana Islands"},
			{CountryCode: "+47", Country: "Norway"},
			{CountryCode: "+968", Country: "Oman"},
			{CountryCode: "+92", Country: "Pakistan"},
			{CountryCode: "+680", Country: "Palau"},
			{CountryCode: "+970", Country: "Palestinian Territory"},
			{CountryCode: "+507", Country: "Panama"},
			{CountryCode: "+675", Country: "Papua New Guinea"},
			{CountryCode: "+595", Country: "Paraguay"},
			{CountryCode: "+51", Country: "Peru"},
			{CountryCode: "+63", Country: "Philippines"},
			{CountryCode: "+48", Country: "Poland"},
			{CountryCode: "+351", Country: "Portugal"},
			{CountryCode: "+1 787", Country: "Puerto Rico"},
			{CountryCode: "+974", Country: "Qatar"},
			{CountryCode: "+262", Country: "Reunion"},
			{CountryCode: "+40", Country: "Romania"},
			{CountryCode: "+7", Country: "Russia"},
			{CountryCode: "+250", Country: "Rwanda"},
			{CountryCode: "+685", Country: "Samoa"},
			{CountryCode: "+378", Country: "San Marino"},
			{CountryCode: "+966", Country: "Saudi Arabia"},
			{CountryCode: "+221", Country: "Senegal"},
			{CountryCode: "+381", Country: "Serbia"},
			{CountryCode: "+248", Country: "Seychelles"},
			{CountryCode: "+232", Country: "Sierra Leone"},
			{CountryCode: "+65", Country: "Singapore"},
			{CountryCode: "+421", Country: "Slovakia"},
			{CountryCode: "+386", Country: "Slovenia"},
			{CountryCode: "+677", Country: "Solomon Islands"},
			{CountryCode: "+27", Country: "South Africa"},
			{CountryCode: "+500", Country: "South Georgia and the South Sandwich Islands"},
			{CountryCode: "+82", Country: "South Korea"},
			{CountryCode: "+34", Country: "Spain"},
			{CountryCode: "+94", Country: "Sri Lanka"},
			{CountryCode: "+249", Country: "Sudan"},
			{CountryCode: "+597", Country: "Suriname"},
			{CountryCode: "+268", Country: "Swaziland"},
			{CountryCode: "+46", Country: "Sweden"},
			{CountryCode: "+41", Country: "Switzerland"},
			{CountryCode: "+963", Country: "Syria"},
			{CountryCode: "+886", Country: "Taiwan"},
			{CountryCode: "+992", Country: "Tajikistan"},
			{CountryCode: "+255", Country: "Tanzania"},
			{CountryCode: "+66", Country: "Thailand"},
			{CountryCode: "+670", Country: "Timor Leste"},
			{CountryCode: "+228", Country: "Togo"},
			{CountryCode: "+690", Country: "Tokelau"},
			{CountryCode: "+676", Country: "Tonga"},
			{CountryCode: "+1 868", Country: "Trinidad and Tobago"},
			{CountryCode: "+216", Country: "Tunisia"},
			{CountryCode: "+90", Country: "Turkey"},
			{CountryCode: "+993", Country: "Turkmenistan"},
			{CountryCode: "+1 649", Country: "Turks and Caicos Islands"},
			{CountryCode: "+688", Country: "Tuvalu"},
			{CountryCode: "+1 340", Country: "U.S. Virgin Islands"},
			{CountryCode: "+256", Country: "Uganda"},
			{CountryCode: "+380", Country: "Ukraine"},
			{CountryCode: "+971", Country: "United Arab Emirates"},
			{CountryCode: "+44", Country: "United Kingdom"},
			{CountryCode: "+1", Country: "United States"},
			{CountryCode: "+598", Country: "Uruguay"},
			{CountryCode: "+998", Country: "Uzbekistan"},
			{CountryCode: "+678", Country: "Vanuatu"},
			{CountryCode: "+58", Country: "Venezuela"},
			{CountryCode: "+84", Country: "Vietnam"},
			{CountryCode: "+1 808", Country: "Wake Island"},
			{CountryCode: "+681", Country: "Wallis and Futuna"},
			{CountryCode: "+967", Country: "Yemen"},
			{CountryCode: "+260", Country: "Zambia"},
			{CountryCode: "+255", Country: "Zanzibar"},
			{CountryCode: "+263", Country: "Zimbabwe"},
		}

		// Insert each country and code
		for _, country_code := range country_codes {
			result := db.Create(&country_code)
			if result.Error != nil {
				fmt.Println("Error creating country and code:", result.Error)
				continue
			}
			fmt.Println("Country Codes created successfully:", country_code.Country)
		}

		// common_menus
		common_menus := []models.CommonMenu{
			{Name: "Organization", Description: "The Organization"},
			{Name: "Users", Description: "The Users"},
			{Name: "Connections", Description: "The Connections"},
			{Name: "Roles", Description: "The Roles"},
			{Name: "Teams", Description: "The Teams"},
		}

		// Insert each menu item
		for _, common_menu := range common_menus {
			result := db.Create(&common_menu)
			if result.Error != nil {
				fmt.Println("Error creating common_menu:", result.Error)
				continue
			}
			fmt.Println("Common Menus created successfully:", common_menu.Name)
		}

		// menus
		menus := []models.Menu{
			{Name: "Organization", CommonMenuID: getIntPointer(10001), IsCommon: true},
			{Name: "Users", CommonMenuID: getIntPointer(10002), IsCommon: true},
			{Name: "Connections", CommonMenuID: getIntPointer(10003), IsCommon: true},
			{Name: "Roles", CommonMenuID: getIntPointer(10004), IsCommon: true},
			{Name: "Teams", CommonMenuID: getIntPointer(10005), IsCommon: true},
		}

		// Insert each menu item
		for _, menu := range menus {
			result := db.Create(&menu)
			if result.Error != nil {
				fmt.Println("Error creating menu:", result.Error)
				continue
			}
			fmt.Println("Menus created successfully:", menu.Name)
		}

		// roles
		roles := []models.Role{
			{ID: 10001, Name: "Account Admin", MenuID: 10001, Read_access: true, Write_access: true, IsDefault: true},
			{ID: 10001, Name: "Account Admin", MenuID: 10002, Read_access: true, Write_access: true, IsDefault: true},
			{ID: 10001, Name: "Account Admin", MenuID: 10003, Read_access: true, Write_access: true, IsDefault: true},
			{ID: 10001, Name: "Account Admin", MenuID: 10004, Read_access: true, Write_access: true, IsDefault: true},
			{ID: 10001, Name: "Account Admin", MenuID: 10005, Read_access: true, Write_access: true, IsDefault: true},

			{ID: 10002, Name: "Developer", MenuID: 10001, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10002, Name: "Developer", MenuID: 10002, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10002, Name: "Developer", MenuID: 10003, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10002, Name: "Developer", MenuID: 10004, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10002, Name: "Developer", MenuID: 10005, Read_access: true, Write_access: false, IsDefault: true},

			{ID: 10003, Name: "Explorer", MenuID: 10001, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10003, Name: "Explorer", MenuID: 10002, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10003, Name: "Explorer", MenuID: 10003, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10003, Name: "Explorer", MenuID: 10004, Read_access: true, Write_access: false, IsDefault: true},
			{ID: 10003, Name: "Explorer", MenuID: 10005, Read_access: true, Write_access: false, IsDefault: true},
		}

		// Insert each role row
		for _, role := range roles {
			result := db.Create(&role)
			if result.Error != nil {
				log.Printf("Error creating Role: %s (%d) for Menu ID: %d\nError: %s\n", role.Name, role.ID, role.MenuID, result.Error)
				continue
			}
			fmt.Printf("Role: %s (%d) created successfully for the Menu ID: %d\n", role.Name, role.ID, role.MenuID)
		}

	}

	return prefill

}

func getIntPointer(num int) *int {
	value := num
	return &value
}

func UpdateSequences(reset bool) error {
	if reset {
		db := GetPostgresDBConnection()

		var tableNames []string
		err := db.Raw("SELECT tablename FROM pg_tables WHERE schemaname = 'public'").Scan(&tableNames).Error
		if err != nil {
			return err
		}
		for _, tableName := range tableNames {
			sequenceName := tableName + "_id_seq"
			err = SetSequence(tableName, sequenceName, db)
			if err != nil {
				fmt.Print("Error while setting sequence!!!")
				return err
			}
		}
	}
	return nil
}

func ResetDB(reset bool) bool {

	if reset {
		db := GetPostgresDBConnection()

		err := models.DropTables(db)
		if err != nil {
			log.Fatalf("\nError dropping tables from database: %v", err)
		} else {
			log.Println("Tables dropped successfully")
		}

		err = models.AutoMigrate(db)
		if err != nil {
			log.Fatalf("\nError migrating models to PostgresSQL: %v", err)
		} else {
			log.Println("Migrated models to PostgresSQL successfully")
		}
	}

	return reset

}

func SetSequence(tableName string, sequenceName string, db *gorm.DB) error {
	if tableName != "roles" {
		err := db.Exec(`
			DO $$ 
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = '` + sequenceName + `') THEN CREATE SEQUENCE ` + sequenceName + ` START 10001;
				END IF;
				EXECUTE 'ALTER SEQUENCE ' || quote_ident('` + sequenceName + `') || ' RESTART WITH 10001';
				EXECUTE 'ALTER TABLE ' || quote_ident('` + tableName + `') || ' ALTER COLUMN id SET DEFAULT nextval(''' || quote_ident('` + sequenceName + `') || ''')';
			END $$;`).Error
		if err != nil {
			return err
		}
	} else {
		err := db.Exec(`
			DO $$ 
			BEGIN
				IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = '` + sequenceName + `') THEN CREATE SEQUENCE ` + sequenceName + ` START 10001;
				END IF;
				EXECUTE 'ALTER SEQUENCE ' || quote_ident('` + sequenceName + `') || ' RESTART WITH 10001';
				EXECUTE 'ALTER TABLE ' || quote_ident('` + tableName + `') || ' ALTER COLUMN sr_no SET DEFAULT nextval(''' || quote_ident('` + sequenceName + `') || ''')';
			END $$;`).Error
		if err != nil {
			return err
		}
	}
	return nil
}
