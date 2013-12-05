class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :event
      t.string :day
      t.integer :time
      t.string :month
      t.integer :year

      t.timestamps
    end
  end
end
