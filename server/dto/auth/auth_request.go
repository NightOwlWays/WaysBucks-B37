package authdto

type RegisterRequest struct {
	FullName string `gorm:"type: varchar(255)" json:"fullName" validate:"required"`
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
	PostCode string `gorm:"type: varchar(255)" json:"postcode" validate:"required"`
	Address string `gorm:"type: varchar(255)" json:"address" validate:"required"`
}

type LoginRequest struct {
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
}
